import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function POST(req:NextRequest){
    const expiresIn = 60 * 60 * 5;  // secs * mins * hours * days
    const cookie = await req.json()
    const cookiesValue = await cookies().then(cookieStore => cookieStore.get("email"))

return NextResponse.json(cookiesValue?.value || "")
   


}
