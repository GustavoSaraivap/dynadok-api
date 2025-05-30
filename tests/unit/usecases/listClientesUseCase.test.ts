import { ListClientesUseCase } from '../../../src/application/usecases/ListClientesUseCase';
import { ClienteRepoMock } from '../mocks/ClienteRepoMock';
import { Cliente } from '../../../src/domain/entities/Cliente';

describe('ListClientesUseCase', () => {
  it('retorna array vazio quando não há clientes', async () => {
    const uc = new ListClientesUseCase(new ClienteRepoMock());
    const list = await uc.execute();
    expect(list).toHaveLength(0);
  });

  it('retorna todos os clientes existentes', async () => {
    const repo = new ClienteRepoMock();
    await repo.create(new Cliente({ nome: 'A', email: 'a@teste.com', telefone: '1' }));
    await repo.create(new Cliente({ nome: 'B', email: 'b@teste.com', telefone: '2' }));

    const uc = new ListClientesUseCase(repo);
    const list = await uc.execute();

    expect(list).toHaveLength(2);
    expect(list.map(c => c.nome)).toEqual(['A', 'B']);
  });
});
