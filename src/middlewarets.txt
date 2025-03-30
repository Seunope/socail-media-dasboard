import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected and public routes
const PUBLIC_ROUTES = ["/", "/login", "/signup"];
const AUTH_ROUTES = ["/login", "/signup"];
const DEFAULT_REDIRECT = "/dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Redirect logged-in users from auth routes to dashboard
  if (AUTH_ROUTES.includes(pathname) && token) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
  }

  // Protect private routes
  if (!PUBLIC_ROUTES.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control (example: protect /settings for admins only)
  if (pathname.startsWith("/settings") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// Match all routes except static files and API routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|unauthorized).*)",
  ],
};
