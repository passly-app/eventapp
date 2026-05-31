import { decode } from '@eventapp/toolkit/jwt';
import { serialize } from '@eventapp/toolkit/url';

import type { UserData, } from '@eventapp/modules/user';
import type { FirebaseUser } from '@eventapp/modules/auth';

import { defineHandler } from '../defineHandler';

export default defineHandler<{ token: string }>(async ({ request, context }) => {
  const token = request.data.token;

  const data = decode<FirebaseUser>(token);

  const { url } = context.env;

  if (!data.email) {
    throw new Error('Invalid token: missing email');
  }

  const user = await context.db.getCollection<UserData>({
    segments: [{ collection: 'users', doc: data.email }]
  });

  const isAdmin = user.roles.includes('admin');

  const redirectUrl = [
    isAdmin ? url.backoffice : url.admin,
    '?',
    serialize({ token }),
  ].join('');

  return { url: redirectUrl };
});