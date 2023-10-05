import firebaseAdmin from "@/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
const adminAuth = firebaseAdmin.auth()

export async function POST(req:NextRequest){
    cookies().get("name")
try{
    const currentUser = await req.json()
   

    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    if(currentUser){
        
        adminAuth.createSessionCookie(currentUser, {expiresIn})
    const validToken = await firebaseAdmin.auth().verifyIdToken(currentUser,true)
    return NextResponse.json({validToken: validToken.uid !== null})
    }
    else{
        return NextResponse.json({validToken: false})
    }
}catch(e){
    return NextResponse.json({validToken: false})
}
  
}
