import NavBar from "@/app/_components/NavBar/NavBar";
import { cookies } from "next/headers";
import AddPosts from "./AddPosts";
import styles from "./page.module.scss";
import ShowPosts from "./ShowPosts";
async function getData() {
  let user;
  try {
    const cookie = cookies().get("name")!.value;
    const res = await fetch(`http://localhost:3000/api/getCookie`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(cookie),
    });
    const json = await res.json();
    user = await json.validToken;
    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const user = await getData();
  return (
    <>
      <NavBar user={user}></NavBar>
      <h1>Posts with realtime update</h1>
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
