import { IClienteRepository } from './../../domain/repositories/base/IClienteRepository';
import { Cliente, ClienteProps } from '../../domain/entities/Cliente';
import { IEventPublisher }    from '../../domain/services/IEventPublisher';

const TOPIC = 'cliente.cadastrado';

export class CreateClienteUseCase {
  constructor(private repo: IClienteRepository, private events: IEventPublisher) {}

  async execute(data: ClienteProps): Promise<Cliente> {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new Error('Este email já está cadastrado!');

    const cliente = await this.repo.create(new Cliente(data));

    await this.events.publish(TOPIC, {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email
    });

    return cliente;
  }
}
