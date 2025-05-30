import { Cliente } from '../../../src/domain/entities/Cliente';

describe('Domain › Cliente entity', () => {
  it('preenche campos e datas corretamente', () => {
    const c = new Cliente({ nome: 'Jo', email: 'jo@mail.com', telefone: '111' });

    expect(c.nome).toBe('Jo');
    expect(c.email).toBe('jo@mail.com');
    expect(typeof c.id).toBe('string');
    expect(c.createdAt).toBeInstanceOf(Date);
    expect(c.updatedAt).toBeInstanceOf(Date);
  });
});
