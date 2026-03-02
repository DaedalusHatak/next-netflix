import NavBar from "@/app/_components/NavBar/NavBar";
import { cookies } from "next/headers";
import AddPosts from "./_components/AddPosts/AddPosts";
import styles from "./page.module.scss";
import ShowPosts from "./_components/ShowPosts/ShowPosts";
import getUser from "@/app/_utils/methods/getUser";

const page = process.env.page as string;

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const cookie = await cookies().then((cookieStore) => cookieStore.get("name"));
  const user = await getUser(cookie?.value || "");
  return (
    <>
      <NavBar user={user}></NavBar>
      <h1 className={styles["h1"]}>Posts with realtime update</h1>
      <AddPosts
        user={user}
        styles={styles}
      ></AddPosts>
      <ShowPosts
        user={user}
        styles={styles}
      ></ShowPosts>
    </>
  );
}
