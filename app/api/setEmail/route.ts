import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function POST(req:NextRequest){
    const expiresIn = 60 * 60 * 5;  // secs * mins * hours * days
    const cookie = await req.json()

    const cookieStore = await cookies();
    const cookiesValue = cookieStore.get("email");
return NextResponse.json(cookiesValue?.value || "")
   


}
