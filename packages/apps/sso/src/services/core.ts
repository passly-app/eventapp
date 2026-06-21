import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

import DB from '@eventapp/integrations/db';
import ServerFunctions from '@eventapp/integrations/serverFunctions';

import { AuthServices } from '@eventapp/modules/auth';
import { UserServices } from '@eventapp/modules/user';

// VARIABLES
export const url = {
  sso: import.meta.env.VITE_SSO_URL,
  admin: import.meta.env.VITE_ADMIN_URL,
  store: import.meta.env.VITE_STORE_URL,
  backoffice: import.meta.env.VITE_BACKOFFICE_URL,
};

export const release = import.meta.env.VITE_RELEASE;

export const isLocal = import.meta.env.VITE_ENV === 'local';

// FIREBASE
const emulatorHost =
  import.meta.env.VITE_HOST || '127.0.0.1';

const app = initializeApp({
  appId: import.meta.env.VITE_APP_ID,
  apiKey: import.meta.env.VITE_API_KEY,
  projectId: import.meta.env.VITE_PROJECT_ID,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'sso');

// FIREBASE SERVICES
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app, 'southamerica-east1');
const googleProvider = new GoogleAuthProvider();

// FIREBASE FUNCTIONS
export const serverFunctions = new ServerFunctions({
  onRedirect: httpsCallable<{ token: string }, { url: string }>(functions, 'onRedirect'),
});

export const authServices = new AuthServices({
  signOut: () => signOut(firebaseAuth),
  googleAuth: () => signInWithPopup(firebaseAuth, googleProvider),
  signInWithPassword: (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password),
  confirmPasswordReset: (oobCode: string, password: string) => confirmPasswordReset(firebaseAuth, oobCode, password),
  createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password),
});

export const db = new DB(firestore);

if (isLocal) {
  connectFirestoreEmulator(firestore, emulatorHost, 8080);
  connectAuthEmulator(firebaseAuth, `http://${emulatorHost}:9099`);
  connectFunctionsEmulator(functions, emulatorHost, 5001);
}

// ENTITY SERVICES
export const userServices = new UserServices(db);