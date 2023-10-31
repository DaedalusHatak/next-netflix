
import NavBar from "@/app/_components/NavBar/NavBar";
import AccountDetails from "./AccountDetails";

import Client from "./Client";
import {firebaseAdmin} from "@/app/_firebase/firebase-admin";
import firebase_app from "@/app/_firebase/firebase-client";
import styles from "./page.module.scss"
import { cookies } from "next/headers";

export default async function Page() {
  const cookie = cookies().get("name")!.value;

const sessionVerifier = await firebaseAdmin.auth().verifySessionCookie(cookie,true)
const user = await firebaseAdmin.auth().getUser(sessionVerifier.uid)
  return (

  <>
   <Client></Client>

   <NavBar user={user.photoURL || "Raiden.webp"}
   ></NavBar>
   <div className={styles["flex-center"]}>
<AccountDetails user={user}></AccountDetails>
   </div>
  </>
  );
}
