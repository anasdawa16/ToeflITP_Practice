"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { registerAction, googleOAuthAction } from "../actions";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

function InputField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "6px", fontFamily: "var(--font-ui)" }}>
        {label}
      </label>
      <input
        id={id} name={id} type={type} placeholder={placeholder} required autoComplete={autoComplete}
        style={{ width: "100%", padding: "10px 14px", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-primary)", fontSize: "var(--text-base)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 200ms ease" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-primary-400)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
      />
    </div>
  );
}

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await registerAction(formData);
      if (result?.error) setError(result.error);
      if (result?.success) setSuccess(result.success);
    });
  }

  function handleGoogle() {
    setError(null);
    startGoogleTransition(async () => {
      const result = await googleOAuthAction();
      if (result?.error) setError(result.error);
    });
  }

  return (
    <>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>
        Create your account
      </h2>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "28px", fontFamily: "var(--font-ui)" }}>
        Start your TOEFL ITP journey today — free
      </p>

      {error && (
        <div role="alert" className="animate-fade-in" style={{ padding: "12px 16px", backgroundColor: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.35)", borderRadius: "var(--radius-md)", color: "#fca5a5", fontSize: "var(--text-sm)", marginBottom: "20px", fontFamily: "var(--font-ui)" }}>
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="animate-fade-in" style={{ padding: "12px 16px", backgroundColor: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.35)", borderRadius: "var(--radius-md)", color: "#6ee7b7", fontSize: "var(--text-sm)", marginBottom: "20px", fontFamily: "var(--font-ui)" }}>
          {success}
        </div>
      )}

      {!success && (
        <>
          <button type="button" onClick={handleGoogle} disabled={isGooglePending || isPending}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "10px 16px", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-primary)", fontSize: "var(--text-sm)", fontWeight: 500, fontFamily: "var(--font-ui)", cursor: "pointer", transition: "all 200ms ease", marginBottom: "20px", opacity: isGooglePending ? 0.7 : 1 }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-primary-400)"; e.currentTarget.style.backgroundColor = "var(--color-bg-tertiary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)"; }}
          >
            <GoogleIcon />
            {isGooglePending ? "Redirecting..." : "Continue with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)" }}>or with email</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <InputField id="full_name" label="Full name" type="text" placeholder="Ahmad Rizki" autoComplete="name" />
            <InputField id="email" label="Email address" type="email" placeholder="you@example.com" autoComplete="email" />
            <div>
              <InputField id="password" label="Password" type="password" placeholder="Min. 8 chars, 1 uppercase, 1 number" autoComplete="new-password" />
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "6px", fontFamily: "var(--font-ui)" }}>
                Minimum 8 characters with at least one uppercase letter and number.
              </p>
            </div>

            <button type="submit" disabled={isPending || isGooglePending}
              style={{ width: "100%", padding: "11px 16px", backgroundColor: isPending ? "var(--color-primary-600)" : "var(--color-primary-500)", border: "none", borderRadius: "var(--radius-md)", color: "#ffffff", fontSize: "var(--text-base)", fontWeight: 600, fontFamily: "var(--font-ui)", cursor: isPending ? "not-allowed" : "pointer", transition: "background-color 200ms ease", marginTop: "4px" }}
              onMouseEnter={(e) => { if (!isPending) e.currentTarget.style.backgroundColor = "var(--color-primary-400)"; }}
              onMouseLeave={(e) => { if (!isPending) e.currentTarget.style.backgroundColor = "var(--color-primary-500)"; }}
            >
              {isPending ? "Creating account…" : "Create free account"}
            </button>
          </form>
        </>
      )}

      <p style={{ textAlign: "center", marginTop: "24px", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "var(--color-primary-300)", fontWeight: 600, textDecoration: "none" }}>
          Sign in
        </Link>
      </p>
    </>
  );
}
