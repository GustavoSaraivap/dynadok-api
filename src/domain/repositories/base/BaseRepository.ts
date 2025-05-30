export interface BaseRepository<T, K = string> {
  create(entity: T): Promise<T>;
  update(id: K, entity: Partial<T>): Promise<T | null>;
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
}
