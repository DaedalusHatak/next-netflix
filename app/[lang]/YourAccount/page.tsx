import NavBar from "@/app/_components/NavBar/NavBar";
import AccountDetails from "./AccountDetails";

import Client from "./Client";
<<<<<<< HEAD
import { firebaseAdmin } from "@/app/_firebase/firebase-admin";
import firebase_app from "@/app/_firebase/firebase-client";
import styles from "./page.module.scss";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  try {
    const cookie = cookies().get("name")!.value;
    const res = await fetch(`http://localhost:3000/api/getCookie`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(cookie),
    });
    const json = await res.json();
    const user = await json.validToken;
    return user;
  } catch (e) {
    console.log(e);
  }
}

export default async function Page() {
  const user = await getData();
=======
import { firebaseAdmin } from "@/app/_utils/firebase/firebase-admin";
import firebase_app from "@/app/_utils/firebase/firebase-client";
import styles from "./page.module.scss";
import { cookies } from "next/headers";
import getUser from "@/app/_utils/methods/getUser";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = process.env.page as string;

export default async function Page() {
  const cookie = cookies().get("name")!.value;
  const user = await getUser(page, cookie);
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb

  console.log("page", user.email);
  // const sessionVerifier = await firebaseAdmin
  //   .auth()
  //   .verifySessionCookie(cookie, true);
  // const user = await firebaseAdmin.auth().getUser(sessionVerifier.uid);
  // console.log("page", user.email);
  return (
    <>
      <Client></Client>

      <NavBar user={user}></NavBar>
      <div className={styles["flex-center"]}>
        <AccountDetails user={user}></AccountDetails>
      </div>
    </>
  );
}
