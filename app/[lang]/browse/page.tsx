import { firebaseAdmin } from "@/app/utils/firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "./client";
import DataList from "@/app/_components/DataList/dataList";
import getUser from "@/app/_utils/methods/getUser";

const page = process.env.page as string;

export default async function Page({ params: { lang } }: any) {
  const cookie = cookies().get("name")!.value;
  const user = await getUser(page, cookie);
  const queries = [
    "3/movie/popular",
    "3/movie/top_rated",
    "3/tv/popular",
    "3/tv/top_rated",
  ];
  return (
    <>
      <Client user={user} />
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
