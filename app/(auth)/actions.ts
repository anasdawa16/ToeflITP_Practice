"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

/* ------------------------------------------------------------------
   ENV GUARD — fail fast with a clear message if Supabase keys are missing
   ------------------------------------------------------------------ */
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error(
    "[FATAL] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. " +
    "Add these environment variables in your Netlify dashboard."
  );
}

/* ------------------------------------------------------------------
   VALIDATION SCHEMAS
   ------------------------------------------------------------------ */
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/* ------------------------------------------------------------------
   TYPES
   ------------------------------------------------------------------ */
export interface ActionResult {
  error?: string;
  success?: string;
}

/* ------------------------------------------------------------------
   LOGIN
   ------------------------------------------------------------------ */
export async function loginAction(
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Incorrect email or password." };
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Please verify your email before logging in." };
    }
    // Surface env-variable issues clearly
    if (error.message.includes("fetch") || error.message.includes("network") || error.message.includes("Failed")) {
      return { error: "Cannot reach authentication server. Contact support." };
    }
    return { error: error.message };
  }

  // Return success — client handles navigation so redirect works on all hosts
  return { success: "ok" };
}

/* ------------------------------------------------------------------
   REGISTER
   ------------------------------------------------------------------ */
export async function registerAction(
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.full_name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "This email is already registered. Try logging in." };
    }
    return { error: error.message };
  }

  return {
    success:
      "Account created! Check your email to verify your account before logging in.",
  };
}

/* ------------------------------------------------------------------
   FORGOT PASSWORD
   ------------------------------------------------------------------ */
export async function forgotPasswordAction(
  formData: FormData
): Promise<ActionResult> {
  const raw = { email: formData.get("email") as string };
  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset-password`,
    }
  );

  if (error) return { error: error.message };

  return {
    success: "Password reset link sent! Check your email.",
  };
}

/* ------------------------------------------------------------------
   LOGOUT
   ------------------------------------------------------------------ */
export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/* ------------------------------------------------------------------
   GOOGLE OAUTH
   ------------------------------------------------------------------ */
export async function googleOAuthAction(): Promise<ActionResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  });

  if (error) return { error: error.message };
  if (data.url) redirect(data.url);

  return { error: "Failed to initiate Google login." };
}
