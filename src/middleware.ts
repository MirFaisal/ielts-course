import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "bn"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if pathname is missing locale
  if (pathnameIsMissingLocale) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|.*\\.).*)",
  ],
};
