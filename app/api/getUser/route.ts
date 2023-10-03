import firebase_app from "@/firebase/firebase";
import firebaseAdmin from "@/firebase/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const cookie = cookies().get("name")
if(cookie?.value)
{
    const photo = (await getAuth(firebaseAdmin).verifyIdToken(cookie.value))
    return NextResponse.json(photo)
}
else{
    return NextResponse.json({photo:"wet"})
}
  
     
  
  
  }
  