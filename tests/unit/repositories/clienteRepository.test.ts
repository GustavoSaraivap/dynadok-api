import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ClienteRepository } from '../../../src/infrastructure/repositories/ClienteRepository';
import { Cliente } from '../../../src/domain/entities/Cliente';

let mongo: MongoMemoryServer;
const repo = new ClienteRepository();

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

describe('Infrastructure › ClienteRepository (Mongo)', () => {

  it('persiste e recupera um cliente', async () => {
    const created = await repo.create(
      new Cliente({ nome: 'Teste', email: 'teste@teste.com', telefone: '123' })
    );
    const found = await repo.findById(created.id!);
    expect(found?.email).toBe('teste@teste.com');
  });

  it('faz update e devolve valor atualizado', async () => {
    const cli = await repo.create(
      new Cliente({ nome: 'Teste1', email: 'teste1@teste.com', telefone: '123' })
    );
    const updated = await repo.update(cli.id!, { telefone: '123' });
    expect(updated?.telefone).toBe('123');
  });

  it('retorna todos via findAll', async () => {
    const all = await repo.findAll();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it('encontra por email via findByEmail', async () => {
    const found = await repo.findByEmail('teste@teste.com');
    expect(found?.nome).toBe('Teste');
  });
});
