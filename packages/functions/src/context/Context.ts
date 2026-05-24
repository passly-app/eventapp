import type DB from '../db';
import type { Env } from '../core';

export type Context = {
   db: DB;
   env: {
      nodeEnv: Env;
      apiKey: string;
      release: string;
      projectId: string;
      authDomain: string;
      url: {
         admin: string;
         backoffice: string;
      }
   };
}
