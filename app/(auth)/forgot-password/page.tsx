"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "../actions";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await forgotPasswordAction(formData);
      if (result?.error) setError(result.error);
      if (result?.success) setSuccess(result.success);
    });
  }

  return (
    <>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>
        Reset your password
      </h2>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "28px", fontFamily: "var(--font-ui)" }}>
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {error && (
        <div role="alert" className="animate-fade-in" style={{ padding: "12px 16px", backgroundColor: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.35)", borderRadius: "var(--radius-md)", color: "#fca5a5", fontSize: "var(--text-sm)", marginBottom: "20px", fontFamily: "var(--font-ui)" }}>
          {error}
        </div>
      )}

      {success ? (
        <div role="status" className="animate-fade-in" style={{ padding: "16px", backgroundColor: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.35)", borderRadius: "var(--radius-md)", color: "#6ee7b7", fontSize: "var(--text-sm)", fontFamily: "var(--font-ui)", lineHeight: 1.6 }}>
          ✓ {success}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "6px", fontFamily: "var(--font-ui)" }}>
              Email address
            </label>
            <input
              id="email" name="email" type="email" placeholder="you@example.com" required autoComplete="email"
              style={{ width: "100%", padding: "10px 14px", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-primary)", fontSize: "var(--text-base)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 200ms ease" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-primary-400)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
            />
          </div>
          <button type="submit" disabled={isPending}
            style={{ width: "100%", padding: "11px 16px", backgroundColor: isPending ? "var(--color-primary-600)" : "var(--color-primary-500)", border: "none", borderRadius: "var(--radius-md)", color: "#ffffff", fontSize: "var(--text-base)", fontWeight: 600, fontFamily: "var(--font-ui)", cursor: isPending ? "not-allowed" : "pointer", transition: "background-color 200ms ease" }}
            onMouseEnter={(e) => { if (!isPending) e.currentTarget.style.backgroundColor = "var(--color-primary-400)"; }}
            onMouseLeave={(e) => { if (!isPending) e.currentTarget.style.backgroundColor = "var(--color-primary-500)"; }}
          >
            {isPending ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}

      <p style={{ textAlign: "center", marginTop: "24px", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}>
        Remember your password?{" "}
        <Link href="/login" style={{ color: "var(--color-primary-300)", fontWeight: 600, textDecoration: "none" }}>
          Sign in
        </Link>
      </p>
    </>
  );
}
