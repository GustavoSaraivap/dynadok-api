import { IClienteRepository } from '../../domain/repositories/base/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';

export class ListClientesUseCase {
  constructor(private repo: IClienteRepository) {}

  async execute(): Promise<Cliente[]> {
    return this.repo.findAll();
  }
}