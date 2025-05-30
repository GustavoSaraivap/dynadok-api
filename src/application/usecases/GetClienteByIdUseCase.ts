import { IClienteRepository } from '../../domain/repositories/base/IClienteRepository';
import { Cliente } from '../../domain/entities/Cliente';
import { NotFoundError } from '../../domain/errors/NotFoundError';
import { ICacheService }   from '../../domain/services/ICacheService';

const CACHE_PREFIX = 'cliente:';

export class GetClienteByIdUseCase {
  constructor(private repo: IClienteRepository, private cache: ICacheService) {}

  async execute(id: string): Promise<Cliente> {
    const cached = await this.cache.get<Cliente>(CACHE_PREFIX + id);
    if (cached) return cached;

    const cliente = await this.repo.findById(id);
    if (!cliente) throw new NotFoundError('Cliente');
    await this.cache.set(CACHE_PREFIX + id, cliente);
    return cliente;
  }
}