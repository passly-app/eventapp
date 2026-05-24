import * as process from '../env';
import type { Context } from './Context';
import DB from '../db';
import { Env } from '../core';
import { firestore } from '../services/firebase';

export function createContext(): Context {
  const env: Context['env'] = {
    nodeEnv: process.env.value() as Env,
    release: process.RELEASE.value(),
    apiKey: process.API_KEY.value(),
    projectId: process.PROJECT_ID.value(),
    authDomain: process.AUTH_DOMAIN.value(),
    url: {
      admin: process.ADMIN_URL.value(),
      backoffice: process.BACKOFFICE_URL.value(),
    },
  };

  const db = new DB(firestore);

  return { env, db };
}