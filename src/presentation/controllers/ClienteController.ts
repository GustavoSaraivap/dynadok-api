import { Request, Response, NextFunction } from 'express';
import {
  CreateClienteUseCase,
  UpdateClienteUseCase,
  GetClienteByIdUseCase,
  ListClientesUseCase,
} from '../../application/usecases';
import { ClienteRepository } from '../../infrastructure/repositories/ClienteRepository';
import { ConflictError } from '../../domain/errors/ConflictError';
import { NotFoundError } from '../../domain/errors/NotFoundError';
import { RedisCacheService } from '../../infrastructure/cache/RedisCacheService';
import { KafkaEventPublisher } from '../../infrastructure/messaging/KafkaEventPublisher';

const repo = new ClienteRepository();
const cache = new RedisCacheService();
const events = new KafkaEventPublisher();

export class ClienteController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const uc = new CreateClienteUseCase(repo, events);
      const result = await uc.execute(req.body);
      res.status(201).json(result);
    } catch (err) { /* … */ }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const uc = new UpdateClienteUseCase(repo);
      const result = await uc.execute(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const uc = new GetClienteByIdUseCase(repo, cache);
      const result = await uc.execute(req.params.id);
      res.json(result);
    } catch (err) {
      if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
      next(err);
    }
  }

  async findAll(_req: Request, res: Response, _next: NextFunction) {
    const uc = new ListClientesUseCase(repo);
    const result = await uc.execute();
    res.json(result);
  }
}