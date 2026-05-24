import { createContext, type Context, type Request } from '../core';

type Return = any | Promise<any>

type Handler<T> = (data: {
  request: Request<T>;
  context: Context;
}) => Return;

export function defineHandler<T>(handler: Handler<T>) {
  return async (request: Request) => {
    const context = createContext();

    return handler({
      request,
      context,
    });
  };
}