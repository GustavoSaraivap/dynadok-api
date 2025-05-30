import { IClienteRepository } from '../../domain/repositories/base/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';
import { NotFoundError } from '../../domain/errors/NotFoundError';

export class UpdateClienteUseCase {
  constructor(private repo: IClienteRepository) {}

  async execute(id: string, data: Partial<Cliente>): Promise<Cliente> {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new NotFoundError('Cliente');
    return updated;
  }
}