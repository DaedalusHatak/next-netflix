import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, NextRequest } from "next/server";

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
  const baseUrl = new URL(`${pathname}`, request.nextUrl);
  const safeUrl = new URL(`/browse`, request.nextUrl);
  try {
    const first = request.cookies.get("name")?.value;
    if (!first) {
      if (request.nextUrl.pathname === "/browse" || request.url === "/browse") {
        return NextResponse.redirect(baseUrl);
      }
    }
    const res = await fetch(`http://localhost:3000/api/getCookie`, {
      method: "POST",
      body: JSON.stringify(first),
    });
    const json = await res.json();
    if (json.validToken) {
      if (
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/"
      ) {
        return NextResponse.redirect(safeUrl);
      }
    }
  } catch (e) {}
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