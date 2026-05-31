import logger from '@eventapp/toolkit/logger';
import { decode } from '@eventapp/toolkit/jwt';
import { local } from '@eventapp/toolkit/dom/local';
import { Cookies } from '@eventapp/toolkit/dom/cookies';

export interface FirebaseUser {
  email: string;
  email_verified: boolean;
  auth_time: number;
  user_id: string;
  name?: string;
  picture?: string;
  firebase: {
    identities: {
      email: Array<string>;
    },
    sign_in_provider: string;
  },
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
}

export interface Methods {
  signOut?: () => Promise<any>;
  googleAuth?: () => Promise<any>;
  sendPasswordResetEmail?: (email: string) => Promise<any>;
  signInWithPassword?: (email: string, password: string) => Promise<any>;
  confirmPasswordReset?: (oobCode: string, password: string) => Promise<any>;
  createUserWithEmailAndPassword?: (email: string, password: string) => Promise<any>;
}

export default class AuthServices {
  private cookies = new Cookies();

  constructor(private methods: Methods) { }

  get access_token() { return this.cookies.get('access_token'); }
  set access_token(token: string) { this.cookies.set('access_token', token); }

  public async loginWithGoogle() {
    if (!this.methods.googleAuth) { return; }

    return this.methods.googleAuth()
      .then(r => {
        this.access_token = r.user.accessToken;

        return decode<FirebaseUser>(r._tokenResponse.idToken);
      });
  }

  public async logout() {
    if (!this.methods.signOut) { return; }

    return this.methods?.signOut()
      .then(() => {
        local.remove('user');
        this.cookies.remove('access_token');
      });
  }

  public async loginWithPassword(email: string, password: string) {
    if (!this.methods.signInWithPassword) { return ''; }

    return this.methods?.signInWithPassword(email, password)
      .then(r => {
        this.access_token = r.user.accessToken;
        return r.user.accessToken as string;
      });
  }

  public async createUserWithPassword(email: string, password: string, options?: { persist: boolean }) {
    if (!this.methods.createUserWithEmailAndPassword) { return; }

    return this.methods?.createUserWithEmailAndPassword(email, password)
      .then(r => {
        if (options?.persist) { this.access_token = r._tokenResponse.idToken; }

        return decode<FirebaseUser>(r._tokenResponse.idToken);
      });
  }

  public async sendMailToResetPassword(email: string) {
    if (!this.methods.sendPasswordResetEmail) { return; }

    return this.methods?.sendPasswordResetEmail(email);
  }

  public async confirmPasswordReset(password: string) {
    if (!this.methods.confirmPasswordReset) { return; }

    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');

    if (!oobCode) {
      logger.error('Código de redefinição ausente.');
      return;
    }

    return this.methods?.confirmPasswordReset(oobCode, password);
  }
}
