import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { ServiceAccount } from 'firebase-admin/app';
import serviceAccount from '../../../firebase.json';

export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

export const auth = getAuth();
