import { onCall } from 'firebase-functions/v2/https';

import _onRedirect from './handlers/onRedirect';
import type { Options } from './core';

const DEFAULT_OPTIONS: Options = {
  region: 'southamerica-east1',
  cors: true,
};

export const onRedirect = onCall(DEFAULT_OPTIONS, _onRedirect);