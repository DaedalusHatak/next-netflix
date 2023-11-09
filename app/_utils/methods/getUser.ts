import { firebaseAdmin } from "../firebase/firebase-admin";
export default async function getUser(cookie: string) {
  try {
    const validToken = await firebaseAdmin
    .auth()
    .verifySessionCookie(cookie, true);
  const user = await firebaseAdmin.auth().getUser(validToken.uid);

 return user.toJSON();
    
  } catch (e:any) {
    console.log("this is my ass",e);
    return e;
  }
}
