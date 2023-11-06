import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, NextRequest } from "next/server";
const env = process.env.NODE_ENV;

const page =
  env === "development"
    ? "http://localhost:3000/"
    : "https://next-app-neon-eta.vercel.app/";
const locales = [
  "en-US",
  "pl-PL",
  "en-GB",
  "fr-FR",
  "de-DE",
  "es-ES",
  "it-IT",
  "ja-JP",
];
export const defaultLocale = "en-US";

function getLocale(request: Request): string {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage.replaceAll("_", "-"));
  }
  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  const locale = getLocale(request) ?? defaultLocale;
  const pathname = request.nextUrl.pathname;
  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl);
  const baseUrl = new URL(`/login`, request.nextUrl);
  const safeUrl = new URL(`/browse`, request.nextUrl);
  const idToken = request.cookies.get("name");
  try {
    //Checking if cookie exists and has value
    if (!idToken) {
      if (
        request.nextUrl.pathname === "/browse" ||
        request.nextUrl.pathname === "/YourAccount"
      ) {
        return NextResponse.redirect(baseUrl);
      }
      return NextResponse.rewrite(newUrl);
    }

    //Validates cookie value
    const res = await fetch(`${page}/api/getCookie`, {
      next: { revalidate: 0 },
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(idToken.value),
    });
    const json = await res.json();
    console.log("middleware", json.validToken.email);
    //Redirects to safe route when cookie has valid token
    if (
      json.validToken &&
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/")
    ) {
      return NextResponse.redirect(safeUrl);
    }

    //Redirects to login route when cookie has invalid token
    if (
      !json.validToken &&
      (request.nextUrl.pathname === "/browse" ||
        request.nextUrl.pathname === "/YourAccount")
    ) {
      return NextResponse.redirect(baseUrl);
    }
  } catch (e) {
    console.log("midd", e);
  }
  return NextResponse.rewrite(newUrl);
}

// See "Matching Paths" below to learn more

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|next|assets|favicon.ico).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
