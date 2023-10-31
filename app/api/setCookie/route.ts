import {firebaseAdmin} from "@/app/_firebase/firebase-admin";
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
  
  const cookieSession  = await firebaseAdmin.auth().createSessionCookie(cookie, {expiresIn: expiresSession})
  cookies().set("name", cookieSession, { maxAge: expiresIn });
  return NextResponse.json(cookies().get("name"));
}
