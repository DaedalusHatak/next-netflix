import NavBar from "@/app/_components/NavBar/NavBar";
import AccountDetails from "./_components/AccountDetails/AccountDetails";

import Client from "./_components/Client/Client";
import styles from "./page.module.scss";
import { cookies } from "next/headers";
import getUser from "@/app/_utils/methods/getUser";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = process.env.page as string;

export default async function Page() {
  const cookie = cookies().get("name");

  const user = cookie ? await getUser(cookie.value) : null;

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
