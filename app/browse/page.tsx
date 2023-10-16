import NavBar from "@/components/NavBar/NavBar";
import firebaseAdmin from "@/firebase/firebase-admin";
import { cookies } from "next/headers";
import DataList from "./dataList";
import { useSelector } from "react-redux";
import MovieCard from "./movieCard";
import Client from "./client";

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

export default async function Page() {
  const data = await getData();
  const queries = [
    "3/movie/popular",
    "3/movie/top_rated",
    "3/tv/popular",
    "3/tv/top_rated",
  ];
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-[0.5rem] md:p-[3rem] pt-32 mb-24">
        <div className="flex flex-col gap-2">
          {" "}
          <h1>Hello world</h1>
        </div>
        <Client data={data} />
        {queries.map((q, index) => (
          <DataList
            key={index}
            query={q}
          />
        ))}
      </main>
    </>
  );
}
