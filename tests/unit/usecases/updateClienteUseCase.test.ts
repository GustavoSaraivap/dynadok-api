import { UpdateClienteUseCase } from '../../../src/application/usecases/UpdateClienteUseCase';
import { ClienteRepoMock } from '../mocks/ClienteRepoMock';
import { Cliente } from '../../../src/domain/entities/Cliente';
import { NotFoundError } from '../../../src/domain/errors/NotFoundError';

describe('UpdateClienteUseCase', () => {
  it('atualiza com sucesso', async () => {
    const repo = new ClienteRepoMock();
    const cli = await repo.create(
      new Cliente({ nome: 'Teste', email: 'teste@teste.com', telefone: '123' })
    );

    const uc = new UpdateClienteUseCase(repo);
    const updated = await uc.execute(cli.id!, { telefone: '321' });

    expect(updated?.telefone).toBe('321');
  });

  it('lança NotFoundError se id inexistente', async () => {
    const repo = new ClienteRepoMock();
    const uc = new UpdateClienteUseCase(repo);

    await expect(uc.execute('missing', { nome: 'Teste' }))
      .rejects.toBeInstanceOf(NotFoundError);
  });
});
