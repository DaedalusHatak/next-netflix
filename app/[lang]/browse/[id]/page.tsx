<<<<<<< HEAD
import { firebaseAdmin } from "@/app/_firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "../client";
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

function currSlide(state = 0, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
=======
import { firebaseAdmin } from "@/app/_utils/firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "../client";
import DataList from "@/app/_components/DataList/dataList";
import getUser from "@/app/_utils/methods/getUser";

const page = process.env.page as string;

>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
const queries = [
  "3/movie/popular",
  "3/movie/top_rated",
  "3/tv/popular",
  "3/tv/top_rated",
];
const titles = ["Popular", "Top Rated"];
function setQueries(id: string) {
  return queries.filter((q) => q.includes(id));
}

export default async function Page({
  params: { lang, id },
  searchParams,
}: {
  params: { lang: string; id: string };
  searchParams: any;
}) {
<<<<<<< HEAD
  const data = await getData();
  const queries = setQueries(id);
  return (
    <>
      <Client data={data} />
=======
  const cookie = cookies().get("name")!.value;
  const user = await getUser(page, cookie);
  const queries = setQueries(id);
  return (
    <>
      <Client user={user} />
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
      <main className="flex gap-28 flex-col items-center justify-between p-[0.5rem 0] md:p-[3rem 0] pt-32 mb-24">
        {queries.map((q, index) => (
          <div key={index}>
            {[...Array(3)].map((page, i) => (
              <div key={i}>
                {id !== "popular" && (
                  <p>
                    {titles[index]}{" "}
                    {id === "tv" ? id.toLocaleUpperCase() : "Movie"}s {i + 1}
                  </p>
                )}
                {id === "popular" && index === 0 && <p>Movies {i + 1}</p>}
                {id === "popular" && index === 1 && <p>TVs {i + 1}</p>}
                <DataList
                  lang={lang}
                  query={q}
                  page={i + 1}
                />
              </div>
            ))}
          </div>
        ))}
      </main>
    </>
  );
}
