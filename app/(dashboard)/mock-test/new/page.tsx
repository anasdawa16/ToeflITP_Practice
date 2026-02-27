"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTestStore } from "@/lib/stores/testStore";
import type { Question, Passage } from "@/types/test";

function MockTestStarter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testType = (searchParams.get("type") ?? "full_mock") as "full_mock" | "section_practice";

  const initSession = useTestStore((s) => s.initSession);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    async function startSession() {
      try {
        const res = await fetch("/api/mock-test/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ test_type: testType }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          console.error("Failed to start session:", err);
          router.push("/mock-test");
          return;
        }

        const data = await res.json();
        initSession({
          sessionId: data.sessionId,
          testType: data.testType,
          s1Questions: data.s1Questions as Question[],
          audioGroups: data.audioGroups as any[],
          s2Questions: data.s2Questions as Question[],
          s3Questions: data.s3Questions as Question[],
          passages: data.passages as Record<string, Passage>,
        });

        router.replace(`/mock-test/${data.sessionId}`);
      } catch (err) {
        console.error(err);
        router.push("/mock-test");
      }
    }

    startSession();
  }, [testType, initSession, router]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        gap: "20px",
        fontFamily: "var(--font-ui)",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "3px solid rgba(255,255,255,0.1)",
          borderTop: "3px solid var(--color-primary-400)",
          borderRadius: "50%",
          animation: "spin 800ms linear infinite",
        }}
      />
      <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)" }}>
        Preparing your test…
      </p>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
        Shuffling questions and setting timers
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function NewMockTestPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        Preparing test environment...
      </div>
    }>
      <MockTestStarter />
    </Suspense>
  );
}
