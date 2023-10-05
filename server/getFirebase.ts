import { getAuth } from "firebase/auth";
import firebase_app from "../firebase/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebase_app)


async function SignInFirebase(email:string,password:string){
    const credentials = await signInWithEmailAndPassword(auth,email,password)
    
    return credentials.user
}
export {SignInFirebase}