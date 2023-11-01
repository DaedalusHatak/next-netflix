import { firebaseAdmin } from "@/app/_firebase/firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const adminAuth = firebaseAdmin.auth();

export async function POST(req: NextRequest) {
  try {
    const currentUser = await req.json();

    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    if (currentUser) {
      const validToken = await firebaseAdmin
        .auth()
        .verifySessionCookie(currentUser, true);
      const user = await firebaseAdmin.auth().getUser(validToken.uid);

      return NextResponse.json({ validToken: user });
    } else {
      return NextResponse.json({ validToken: false });
    }
  } catch (e) {
    console.log("getCookie", e);
    return NextResponse.json({ validToken: false });
  }
}
