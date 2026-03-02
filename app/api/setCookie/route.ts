import { firebaseAdmin } from "@/app/_utils/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const expiresIn = 60 * 60 * 24 * 14; // seconds
  const expiresSession = expiresIn * 1000; // milliseconds

  const idToken = await req.json();

  const cookieStore = await cookies(); // ✅ unwrap first

  if (!idToken) {
    cookieStore.delete("name");
    return NextResponse.json("");
  }

  try {
    const verifyToken = await firebaseAdmin
      .auth()
      .verifyIdToken(idToken, true);

    if (!verifyToken) {
      return NextResponse.json(false);
    }

    const sessionCookie = await firebaseAdmin
      .auth()
      .createSessionCookie(idToken, { expiresIn: expiresSession });

    cookieStore.set("name", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(false);
  }
}