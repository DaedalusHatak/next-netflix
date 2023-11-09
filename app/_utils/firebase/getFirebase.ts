import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import firebase_app from "./firebase-client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebaseAdmin } from "./firebase-admin";
const auth = getAuth(firebase_app);

async function SignInFirebase(email: string, password: string) {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (e: any) {
    return e.message;
  }
}

async function signOutUser(uid: string) {
  await auth.signOut();
  const data = await fetch("/api/setCookie", {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(""),
  });

  const res = await data.json();
  console.log(res);
  return res;
}
async function createUser(email: string, password: string) {
  try {
    const createuser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await fetch("/api/setEmail", { method: "POST", body: JSON.stringify("") });
    return true;
  } catch (err) {
    if (err instanceof FirebaseError) {
      return err.message;
    }
  }
}

export { SignInFirebase, createUser, signOutUser };
