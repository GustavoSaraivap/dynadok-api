export class NotFoundError extends Error {
  constructor(entity: string) {
    super(`${entity} não encontrado(a).`);
    this.name = 'NotFoundError';
  }
}