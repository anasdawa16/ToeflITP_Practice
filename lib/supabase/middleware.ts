import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

/**
 * Supabase middleware client — refreshes session cookies on every request
 * Must be used in middleware.ts to keep auth session alive
 */
export async function updateSession(request: NextRequest) {
  // Guard: if Supabase env vars are missing, skip auth check gracefully
  // (prevents MIDDLEWARE_INVOCATION_FAILED on Vercel/Netlify when vars not set)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { supabaseResponse: NextResponse.next({ request }), user: null };
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — MUST NOT be removed (keeps tokens alive)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user };
}
