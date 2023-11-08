import NavBar from "@/app/_components/NavBar/NavBar";
import { cookies } from "next/headers";
import AddPosts from "./AddPosts";
import styles from "./page.module.scss";
import ShowPosts from "./ShowPosts";
import getUser from "@/app/_utils/methods/getUser";

const page = process.env.page as string;

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const cookie = cookies().get("name")!.value;
  const user = await getUser(page, cookie);
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
