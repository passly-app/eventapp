import { getFirestore } from 'firebase-admin/firestore';
import { getApps, initializeApp } from 'firebase-admin/app';

const app = getApps().length ? getApps()[0] : initializeApp();

export const firestore = getFirestore(app);