import { firebaseAdmin } from "@/app/_utils/firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "./client";
import DataList from "@/app/[lang]/browse/_components/DataList/dataList";
import getUser from "@/app/_utils/methods/getUser";
import { User } from "@/types";

const page = process.env.page as string;

export default async function Page({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const cookie = await cookies()
  const cookieValue = cookie.get("name")?.value;
  const user: User = cookieValue ? await getUser(cookieValue) : null;
  console.log(user);
  const queries = [
    "3/movie/popular",
    "3/movie/top_rated",
    "3/tv/popular",
    "3/tv/top_rated",
  ];
  const name = [
    "Popular Movies",
    "Top Rated Movies",
    "Popular TV Shows",
    "Top Rated TV Shows",
  ];

  return (
    <>
      <Client user={user} />
     <main className="flex gap-28 flex-col items-center justify-between p-[0.5rem 0] md:p-[3rem 0] pt-32 mb-24">
        {queries.map((q, index) => (
       <div key={index}>   <p>{name[index]}</p>
          <DataList
            lang={lang}
            key={index}
            query={q}
          /></div>
        ))}
      </main>
    </>
  );
}
