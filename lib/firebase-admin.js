import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const adminConfig = {
  credential: cert({
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: 'https://ojambo01.firebaseio.com'
}

const adminApp = getApps().length === 0 ? initializeApp(adminConfig) : getApp();

const db = getFirestore(adminApp)
const auth = getAuth(adminApp)

export { db, auth };