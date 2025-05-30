import { BaseRepository } from './BaseRepository';
import { Cliente } from './../../entities/Cliente';

export interface IClienteRepository extends BaseRepository<Cliente> {
  findByEmail(email: string): Promise<Cliente | null>;
}
