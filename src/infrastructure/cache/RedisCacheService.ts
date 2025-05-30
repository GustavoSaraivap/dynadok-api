import { ICacheService } from '../../domain/services/ICacheService';
import Redis from 'ioredis';

export class RedisCacheService implements ICacheService {
  private client: Redis;

  constructor(url = process.env.REDIS_URL!) {
    this.client = new Redis(url);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  async set<T>(key: string, value: T, ttl = 300): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
