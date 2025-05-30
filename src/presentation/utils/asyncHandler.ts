import { RequestHandler } from 'express';

/**
 * Converte um método assíncrono (req, res, next) em RequestHandler,
 * encaminhando erros automaticamente para o middleware de erro do Express.
 */
export const asyncHandler = (fn: (...args: any[]) => Promise<any>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
