import { firebaseAdmin } from "@/app/_firebase/firebase-admin";
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
