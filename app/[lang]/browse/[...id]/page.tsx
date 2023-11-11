import { cookies } from "next/headers";
import Client from "../client";
import DataList from "@/app/[lang]/browse/_components/DataList/dataList";
import getUser from "@/app/_utils/methods/getUser";
import { User } from "@/types";

const page = process.env.page as string;

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
  searchParams: string;
}) {
  console.log(id);
  const cookie = cookies().get("name");
  const user: User = cookie ? await getUser(cookie.value) : null;
  const queries = setQueries(id);
  return (
    <>
      <Client user={user} />
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
