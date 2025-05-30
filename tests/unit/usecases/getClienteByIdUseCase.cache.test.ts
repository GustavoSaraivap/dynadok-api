import { GetClienteByIdUseCase } from '../../../src/application/usecases/GetClienteByIdUseCase';
import { ClienteRepoMock } from '../mocks/ClienteRepoMock';
import { Cliente } from '../../../src/domain/entities/Cliente';
import { ICacheService } from '../../../src/domain/services/ICacheService';

class CacheMock implements ICacheService {
  store = new Map<string, string>();
  async get<T>(k: string) { return this.store.get(k) ? JSON.parse(this.store.get(k)!) as T : null; }
  async set<T>(k: string, v: T) { this.store.set(k, JSON.stringify(v)); }
  async del(k: string) { this.store.delete(k); }
}

describe('GetClienteByIdUseCase + Cache', () => {
  it('retorna do cache quando presente', async () => {
    const repo = new ClienteRepoMock();
    const cache = new CacheMock();
    const cliente = new Cliente({ nome: 'Teste', email: 'teste@teste.com', telefone: '1' });
    await repo.create(cliente);
    await cache.set('cliente:'+cliente.id, cliente);

    const uc = new GetClienteByIdUseCase(repo, cache);
    const result = await uc.execute(cliente.id!);

    expect(result.nome).toBe('Teste');
    expect(await repo.findAll()).toHaveLength(1);
  });
});
