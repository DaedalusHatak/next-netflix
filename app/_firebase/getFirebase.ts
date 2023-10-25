import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "./firebase-client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
const auth = getAuth(firebase_app)


async function SignInFirebase(email:string,password:string){
    const credentials = await signInWithEmailAndPassword(auth,email,password)
    
    return credentials.user
}

async function createUser(email: string, password: string){
    const auth = getAuth();
    try {
      const createuser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await fetch("/api/setEmail", { method: "POST", body: JSON.stringify("") });
      return true
    } catch (err) {
      if (err instanceof FirebaseError) {
        return err.message;
      }
    }
  };

export {SignInFirebase,createUser}