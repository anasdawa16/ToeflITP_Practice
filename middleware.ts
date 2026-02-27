import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Route Protection Middleware
 * - Dashboard routes → require auth → redirect /login if not authenticated
 * - Auth routes (/login, /register) → redirect / if already authenticated
 * - Onboarding check → redirect /onboarding if profile not complete
 */
export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password");

  const isOnboardingRoute = pathname.startsWith("/onboarding");

  // Landing page at root — always public
  const isLandingPage = pathname === "/";

  // Authenticated user on auth pages → redirect to dashboard
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Unauthenticated user on landing page → allow through
  if (!user && isLandingPage) {
    return supabaseResponse;
  }

  // Unauthenticated user accessing protected routes → redirect to login
  if (!user && !isAuthRoute && !isLandingPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow onboarding to pass through (even if not completed)
  if (user && isOnboardingRoute) {
    return supabaseResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - /api/* (API routes handled separately)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
