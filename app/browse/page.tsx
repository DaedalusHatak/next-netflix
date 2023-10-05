import Square from "@/components/button/button";
import NavBar from "@/components/NavBar/NavBar";
import firebaseAdmin from "@/firebase/firebase-admin";
import { cookies } from "next/headers";
import Carousel from "./carousel";
async function getData() {
  try {
    if(!cookies().get("name")) return "Raiden.webp";
    const user = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies().get("name")!.value);
    return user.picture ? user.picture : "Raiden.webp";
  } catch (e) {
    return "Raiden.webp"
  }
}
export default async function Page() {
  const data = await getData();
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_API_SECRET}`
  )
  const res = await movie.json();
  console.log(res)
  return (
    <>
      <NavBar user={data}></NavBar>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col gap-2">
          {" "}
          <h1>Hello world</h1>
          {res && <Carousel data={res.results}  
             emitImage={true}
             
             emitImageDelay={350}
    size={2}
    sm={3}
    md={4}
    lg={5}
    overflow="true"
    buttonPadding="-3"
    buttonWidth="3"
    buttonVisibile="true"
    xl={6}
    xxl={7} />}

        </div>
      </main>
    </>
  );
}
