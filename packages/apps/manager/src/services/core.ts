import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

import DB from '@eventapp/integrations/db';
import Storage from '@eventapp/integrations/storage';
import GoogleMaps from '@eventapp/integrations/googleMaps';

import { AuthServices } from '@eventapp/modules/auth';
import { UserServices } from '@eventapp/modules/user';
import { RolesServices } from '@eventapp/modules/roles';
import { EventServices } from '@eventapp/modules/event';

// VARIABLES
export const APP_NAME = 'Passly';

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
}, 'manager');

// FIREBASE SERVICES
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app, 'southamerica-east1');
const firebaseStorage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export const authServices = new AuthServices({
  signOut: () => signOut(firebaseAuth),
  googleAuth: () => signInWithPopup(firebaseAuth, googleProvider),
  signInWithPassword: (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password),
  sendPasswordResetEmail: (email) => sendPasswordResetEmail(
    firebaseAuth,
    email,
    { url: `${url.sso}/signin?email=${email}`, handleCodeInApp: true }
  ),
  createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password),
});

export const db = new DB(firestore);
export const storage = new Storage(firebaseStorage);

// GOOGLE MAPS
export const googleMaps = new GoogleMaps({
  key: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  language: 'pt-BR',
  region: 'BR',
});

if (isLocal) {
  connectFirestoreEmulator(firestore, emulatorHost, 8080);
  connectAuthEmulator(firebaseAuth, `http://${emulatorHost}:9099`);
  connectFunctionsEmulator(functions, emulatorHost, 5001);
  connectStorageEmulator(firebaseStorage, emulatorHost, 9199);
}

// ENTITY SERVICES
export const userServices = new UserServices(db);
export const rolesServices = new RolesServices(db);
export const eventServices = new EventServices(db);
