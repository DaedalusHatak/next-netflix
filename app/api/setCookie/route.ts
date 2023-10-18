import firebaseAdmin from "@/app/_firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
const adminAuth = firebaseAdmin.auth()


export async function POST(req:NextRequest){
    const expiresIn = 60 * 60 * 24 * 14 ;  // secs * mins * hours * days
    const cookie = await req.json()
    cookies().set("name",cookie, {maxAge:expiresIn})
return NextResponse.json(cookies().get("name"))
   


}
