import { Request, Response, NextFunction } from 'express';

/**
 * @description: Middleware to handle async route handlers and catch errors
 * @param {Function} fn - The async function to be executed
 * @returns {Function} - A middleware function that handles errors
 */

const routeHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default routeHandler;
