"use server"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


 

try{
  const first = request.cookies.get("name")?.value
  if(!first){
    if(request.nextUrl.pathname === "/browse" || request.url === "/browse"){
      return NextResponse.redirect(new URL('http://localhost:3000/',request.url))
     }

  }
  const res = await fetch(`http://localhost:3000/api/getCookie`,{method:"POST",body:JSON.stringify(first)});
  const json = await res.json();
 if(json.validToken){
if(request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/"){
  return NextResponse.redirect(new URL('http://localhost:3000/browse',request.url))
}}

}catch(e){
}
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/browse','/login'],
}