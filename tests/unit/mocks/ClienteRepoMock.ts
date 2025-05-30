import { IClienteRepository } from './../../../src/domain/repositories/base/IClienteRepository';
import { Cliente } from '../../../src/domain/entities/Cliente';

export class ClienteRepoMock implements IClienteRepository {
  private db: Cliente[] = [];

  async create(entity: Cliente) { this.db.push(entity); return entity; }
  async update(id: string, data: Partial<Cliente>) {
    const idx = this.db.findIndex(c => c.id === id);
    if (idx === -1) return null;
    Object.assign(this.db[idx], data);
    return this.db[idx];
  }
  async findById(id: string) { return this.db.find(c => c.id === id) ?? null; }
  async findAll() { return this.db; }
  async findByEmail(email: string) { return this.db.find(c => c.email === email) ?? null; }
}
