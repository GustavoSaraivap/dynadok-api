import { randomUUID } from 'crypto';

export abstract class BaseEntity<T = string> {
  public readonly id: T;

  public readonly createdAt: Date;
  public updatedAt: Date;

  protected constructor(id?: T) {
    this.id = id ?? (randomUUID() as unknown as T);

    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }
}
