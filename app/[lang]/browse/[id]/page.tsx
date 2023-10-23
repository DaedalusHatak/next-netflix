import firebaseAdmin from "@/app/_firebase/firebase-admin";
import { cookies } from "next/headers";
import Client from "../client";
import DataList from "@/app/_components/DataList/dataList";

async function getData() {
  try {
    if (!cookies().get("name")) return "Raiden.webp";
    const user = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies().get("name")!.value);
    return user.picture ? user.picture : "Raiden.webp";
  } catch (e) {
    return "Raiden.webp";
  }
}

function currSlide(state = 0, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
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
  console.log(id);
  const data = await getData();
  const queries = setQueries(id);
  return (
    <>
      <Client data={data} />
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
