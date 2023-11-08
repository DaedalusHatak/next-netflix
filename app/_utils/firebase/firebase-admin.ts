import * as firebaseAdmin from "firebase-admin";
import { app } from "firebase-admin";

const firebaseConfig = {
  projectId: process.env.NEXT_FIREBASE_SA_PROJECT_ID,
  privateKey: process.env.NEXT_FIREBASE_PRIVATE_SA_KEY
    ? process.env.NEXT_FIREBASE_PRIVATE_SA_KEY.replace(/\\n/gm, "\n")
    : undefined,
  clientEmail: process.env.NEXT_FIREBASE_SA_CLIENT_EMAIL,
};


if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(firebaseConfig) });
} 

export {firebaseAdmin};
