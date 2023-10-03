import firebaseAdmin from "@/firebase/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const token = req.cookies.get("name");
  console.log(token);
  if (token) {
    const photo = await getAuth(firebaseAdmin).verifyIdToken(token.value);
    console.log(photo);
    return NextResponse.json({ photo: photo });
  } else {
    return NextResponse.json({ photo: "wet" });
  }
}
