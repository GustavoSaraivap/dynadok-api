# README.md

## dynadok-api

API REST para cadastro e consulta de clientes, construída em **Node.js + Express** e organizada em **Clean Architecture**.
Inclui:

* MongoDB para persistência
* Redis para cache na busca por ID
* Kafka (Bitnami) para mensageria (evento *cliente.cadastrado*)
* Docker / Docker Compose para execução
* Testes unitários com Jest

---

## Pré-requisitos

* Docker 20+
* Docker Compose v2 habilitado (`docker compose …`)
* Git

> Se quiser rodar os testes localmente sem Docker, instale também **Node.js 20+** e **npm 9+**.

---

## Clonando o projeto

```bash
git clone https://github.com/GustavoSaraivap/dynadok-api.git
cd dynadok-api
```

---

## Executando com Docker Compose

1. **Build e subida de todos os serviços**

   ```bash
   docker compose up --build
   ```

   O Compose iniciará:

   * `mongo` – banco de dados
   * `redis` – cache
   * `zookeeper` + `kafka` – mensageria
   * `api` – serviço HTTP em **localhost:3000**
   * `consumer` – processa evento e simula envio de e-mail de boas-vindas

2. **Logs**

   * API: `docker logs -f clientes_api`
   * Consumer: `docker logs -f clientes_consumer`

3. **Parar tudo**

   ```bash
   docker compose down
   ```

---

## Testando os endpoints

Todos os exemplos assumem `localhost:3000`.

| Operação                  | Método e caminho    | Exemplo `curl`                                                                                                                                               |
| ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cadastrar cliente         | `POST /clientes`    | `curl -X POST http://localhost:3000/clientes \`<br>`  -H "Content-Type: application/json" \`<br>`  -d '{"nome":"Ana","email":"ana@x.com","telefone":"999"}'` |
| Listar todos              | `GET /clientes`     | `curl http://localhost:3000/clientes`                                                                                                                        |
| Buscar por ID (usa cache) | `GET /clientes/:id` | `curl http://localhost:3000/clientes/<ID>`                                                                                                                   |
| Atualizar                 | `PUT /clientes/:id` | `curl -X PUT ... -d '{"telefone":"123"}'`                                                                                                                    |

Após o *POST* o consumidor Kafka registrará no log algo como:

```
📧 Enviando boas-vindas para ana@x.com (Ana)
```

---

## Rodando os testes unitários

```bash
npm ci          # instala dependências de dev
npm test
```

Jest executa mocks de Redis, Kafka e Mongo em memória – nada externo é necessário.

---

## Arquitetura em camadas (Clean Architecture)

```
domain
  ├─ entities        ← regras de negócio puras (ex.: Cliente)
  ├─ services        ← contratos (ICacheService, IEventPublisher)
  └─ errors
application
  └─ usecases        ← orquestram regras (CreateClienteUseCase, etc.)
presentation
  ├─ controllers     ← HTTP adapters (Express)
  ├─ routes
  └─ middlewares
infrastructure
  ├─ database        ← Mongo models + conexão
  ├─ cache           ← RedisCacheService (implementa ICacheService)
  ├─ messaging       ← KafkaEventPublisher (implementa IEventPublisher)
  └─ repositories    ← ClienteRepository (Mongo)
```

* **SRP** – cada classe tem apenas uma responsabilidade.
* **DIP** – camadas de cima dependem de **interfaces**, não detalhes.
* **OCP** – trocar Redis ou Kafka implica apenas novas implementações de serviço, sem alterar use-cases ou controladores.
* **Testabilidade** – use-cases testados com repositórios e serviços *mock*.

---

## Comandos úteis

| Ação                               | Comando                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| Reconstruir apenas a imagem da API | `docker compose build api`                                                   |
| Ver filas Kafka (opcional)         | `docker exec -it kafka kafka-topics.sh --bootstrap-server kafka:9092 --list` |
| Abrir shell Mongo                  | `docker exec -it clientes_db mongosh`                                        |

---

## Licença

ISC – veja o arquivo `LICENSE`.
