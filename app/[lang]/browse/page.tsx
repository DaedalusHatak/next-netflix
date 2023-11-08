<<<<<<< HEAD
import { firebaseAdmin } from "@/app/_firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "./client";
import DataList from "@/app/_components/DataList/dataList";

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

export default async function Page({ params: { lang } }: any) {
  const data = await getData();
=======
import { firebaseAdmin } from "@/app/_utils/firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "./client";
import DataList from "@/app/_components/DataList/dataList";
import getUser from "@/app/_utils/methods/getUser";

const page = process.env.page as string;

export default async function Page({ params: { lang } }: any) {
  const cookie = cookies().get("name")!.value;
  const user = await getUser(page, cookie);
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
  const queries = [
    "3/movie/popular",
    "3/movie/top_rated",
    "3/tv/popular",
    "3/tv/top_rated",
  ];
  return (
    <>
<<<<<<< HEAD
      <Client data={data} />
=======
      <Client user={user} />
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
      <main className="flex gap-28 flex-col items-center justify-between p-[0.5rem 0] md:p-[3rem 0] pt-32 mb-24">
        {queries.map((q, index) => (
          <DataList
            lang={lang}
            key={index}
            query={q}
          />
        ))}
      </main>
    </>
  );
}
