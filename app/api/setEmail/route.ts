import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function POST(req:NextRequest){
    const expiresIn = 60 * 60 * 5;  // secs * mins * hours * days
    const cookie = await req.json()
    cookies().set("email",cookie, {maxAge:expiresIn})
return NextResponse.json(cookies().get("email"))
   


}
