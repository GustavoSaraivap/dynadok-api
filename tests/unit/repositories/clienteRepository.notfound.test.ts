import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ClienteRepository } from '../../../src/infrastructure/repositories/ClienteRepository';

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

describe('ClienteRepository – caminhos de retorno null', () => {
  const INVALID_ID = 'invalido123';
  const VALID_BUT_MISSING_ID = '507f1f77bcf86cd799439011';

  it('update retorna null se id inválido', async () => {
    const res = await repo.update(INVALID_ID, { nome: 'X' } as any);
    expect(res).toBeNull();
  });

  it('update retorna null se id válido mas inexistente', async () => {
    const res = await repo.update(VALID_BUT_MISSING_ID, { nome: 'Y' } as any);
    expect(res).toBeNull();
  });

  it('findById retorna null se id inválido', async () => {
    const res = await repo.findById(INVALID_ID);
    expect(res).toBeNull();
  });

  it('findById retorna null se id válido mas inexistente', async () => {
    const res = await repo.findById(VALID_BUT_MISSING_ID);
    expect(res).toBeNull();
  });

  it('findByEmail retorna null quando email não existe', async () => {
    const res = await repo.findByEmail('naoexiste@teste.com');
    expect(res).toBeNull();
  });
});
