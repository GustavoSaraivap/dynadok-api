import { GetClienteByIdUseCase } from '../../../src/application/usecases/GetClienteByIdUseCase';
import { ClienteRepoMock } from '../mocks/ClienteRepoMock';
import { Cliente } from '../../../src/domain/entities/Cliente';
import { NotFoundError } from '../../../src/domain/errors/NotFoundError';
import { CacheMock } from '../mocks/CacheMock';

describe('GetClienteByIdUseCase', () => {
  it('retorna o cliente quando existe (e salva no cache)', async () => {
    const repo   = new ClienteRepoMock();
    const cache  = new CacheMock();
    const cliente = new Cliente({ nome: 'Teste', email: 'teste@teste.com', telefone: '123' });
    await repo.create(cliente);

    const useCase = new GetClienteByIdUseCase(repo, cache);
    const found   = await useCase.execute(cliente.id!);

    expect(found.email).toBe('teste@teste.com');
    expect(await cache.get('cliente:' + cliente.id)).not.toBeNull();
  });

  it('lança NotFoundError quando não existe', async () => {
    const repo  = new ClienteRepoMock();
    const cache = new CacheMock();
    const useCase = new GetClienteByIdUseCase(repo, cache);

    await expect(useCase.execute('fake-id')).rejects.toBeInstanceOf(NotFoundError);
  });
});
