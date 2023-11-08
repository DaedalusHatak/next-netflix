<<<<<<< HEAD
import { firebaseAdmin } from "@/app/_firebase/firebase-admin";
=======
import { firebaseAdmin } from "@/app/_utils/firebase/firebase-admin";
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const adminAuth = firebaseAdmin.auth();

export async function POST(req: NextRequest) {
  const uid = await req.json();
  console.log(uid);
  try {
    firebaseAdmin.auth().revokeRefreshTokens(uid);
    return NextResponse.json(true);
  } catch (e) {
    return NextResponse.json(false);
  }
}
