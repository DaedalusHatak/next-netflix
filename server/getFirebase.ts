import { getAuth } from "firebase/auth";
import firebase_app from "../firebase/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebase_app)


async function signing(){
    const credentials = await signInWithEmailAndPassword(auth,"test@test.com","test1234")
    
    return credentials.user
}
export {signing}