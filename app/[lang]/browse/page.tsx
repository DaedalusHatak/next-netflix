import { firebaseAdmin } from "@/app/_firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "./client";
import DataList from "@/app/_components/DataList/dataList";

const env = process.env.NODE_ENV;

const page =
  env === "development"
    ? "http://localhost:3000/"
    : "https://next-app-neon-eta.vercel.app/";

async function getData() {
  let user;
  try {
    const cookie = cookies().get("name")!.value;
    const res = await fetch(`${page}api/getCookie`, {
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
  const queries = [
    "3/movie/popular",
    "3/movie/top_rated",
    "3/tv/popular",
    "3/tv/top_rated",
  ];
  return (
    <>
      <Client data={data} />
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
