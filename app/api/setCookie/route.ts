import { firebaseAdmin } from "@/app/_utils/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const adminAuth = firebaseAdmin.auth();

export async function POST(req: NextRequest) {
  const expiresIn = 60 * 60 * 24 * 14; // secs * mins * hours * days
  const expiresSession = 60 * 60 * 24 * 14 * 1000;
  const cookie = await req.json();
  if (cookie === "") {
    cookies().delete("name");
    return NextResponse.json("");
  }
  const verifyCookie = await firebaseAdmin.auth().verifyIdToken(cookie, true);
  if (verifyCookie) {
    const cookieSession = await firebaseAdmin
      .auth()
      .createSessionCookie(cookie, { expiresIn: expiresSession });
    cookies().set("name", cookieSession, { maxAge: expiresIn });
    return NextResponse.json(cookies().get("name"));
  } else {
    return NextResponse.json(false);
  }
}
