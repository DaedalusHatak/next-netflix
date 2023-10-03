import firebaseAdmin from "@/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
const adminAuth = firebaseAdmin.auth()


export async function POST(req:NextRequest){
    const cookie = await req.json()
    cookies().set("name",cookie)
return NextResponse.json(cookies().get("name"))
   


}
