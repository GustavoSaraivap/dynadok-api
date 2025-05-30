import { CreateClienteUseCase } from '../../../src/application/usecases/CreateClienteUseCase';
import { ClienteRepoMock } from '../mocks/ClienteRepoMock';
import { EventPublisherMock } from '../mocks/EventPublisherMock';

describe('CreateClienteUseCase', () => {
  it('should create a new client and publish event', async () => {
    const repo   = new ClienteRepoMock();
    const events = new EventPublisherMock();
    const useCase = new CreateClienteUseCase(repo, events);

    const result = await useCase.execute({
      nome: 'Teste 123',
      email: 'teste@teste.com',
      telefone: '123-4567'
    });

    expect(result).toHaveProperty('id');
    expect(events.published).toHaveLength(1);
    expect(events.published[0].topic).toBe('cliente.cadastrado');
  });

  it('should reject duplicated email', async () => {
    const repo   = new ClienteRepoMock();
    const events = new EventPublisherMock();
    const useCase = new CreateClienteUseCase(repo, events);

    await useCase.execute({ nome: 'A', email: 'teste@teste.com', telefone: '1' });
    await expect(
      useCase.execute({ nome: 'B', email: 'teste@teste.com', telefone: '2' })
    ).rejects.toThrow('Este email já está cadastrado!');
  });
});