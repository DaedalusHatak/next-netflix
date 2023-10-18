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
function setQueries(id:string){
        return queries.filter(q => q.includes(id))
}

export default async function Page({params: {lang,id},searchParams}:any) {
  console.log(id)
  const data = await getData();
const queries = setQueries(id)
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
