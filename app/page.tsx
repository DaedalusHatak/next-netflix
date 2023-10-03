import Square from "@/components/button/button";
import NavBar from "@/components/NavBar/NavBar";
import SignIn from "@/components/SignIn";
import firebaseAdmin from "@/firebase/firebase-admin";
import { cookies } from "next/headers";
async function getData() {
  try {
    const user = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies().get("name")!.value);
    console.log(user);
    return user.picture;
  } catch (e) {
    console.log("error", e);
  }
}
export default async function Page() {
  const data = await getData();

  return (
    <>
      <NavBar user={data}></NavBar>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col gap-2">
          {" "}
          <h1>Hello world</h1>
          <Square
            value="Browse"
            navigateTo="/browse"
          ></Square>
        </div>
        <SignIn></SignIn>
      </main>
    </>
  );
}
