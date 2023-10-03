import * as admin from "firebase-admin";
import { app } from "firebase-admin";
import { cert, getApps } from "firebase-admin/app";

const firebaseConfig = {
  projectId: process.env.NEXT_FIREBASE_SA_PROJECT_ID,
  privateKey: process.env.NEXT_FIREBASE_PRIVATE_SA_KEY
    ? process.env.NEXT_FIREBASE_PRIVATE_SA_KEY.replace(/\\n/gm, "\n")
    : undefined,
  clientEmail: process.env.NEXT_FIREBASE_SA_CLIENT_EMAIL,
};
console.log(firebaseConfig);
let firebaseAdmin: app.App;

if (getApps().length == 0) {
  firebaseAdmin = admin.initializeApp({ credential: cert(firebaseConfig) });
} else {
  firebaseAdmin = admin.app();
}

export default firebaseAdmin;
