"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { QUICK_PROMPTS, type UserContext } from "@/lib/gemini/prompts";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  isStreaming?: boolean;
}

interface AIChatProps {
  context?: UserContext;
}

// Minimal markdown renderer for bold, code, bullet lists
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} style={{ margin: "4px 0 8px 16px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {listItems.map((li, i) => (
            <li key={i} style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              {applyInline(li)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function applyInline(str: string): React.ReactNode {
    // Bold **text** and `code`
    const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) {
        return <strong key={i} style={{ color: "var(--color-text-primary)", fontWeight: 700 }}>{p.slice(2, -2)}</strong>;
      }
      if (p.startsWith("`") && p.endsWith("`")) {
        return <code key={i} style={{ fontFamily: "monospace", fontSize: "12px", backgroundColor: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: "3px", color: "#a78bfa" }}>{p.slice(1, -1)}</code>;
      }
      return p;
    });
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Heading
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(<p key={elements.length} style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", margin: "10px 0 4px" }}>{trimmed.slice(3)}</p>);
    } else if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(<p key={elements.length} style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--color-text-primary)", margin: "12px 0 6px" }}>{trimmed.slice(2)}</p>);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed === "") {
      flushList();
      elements.push(<div key={elements.length} style={{ height: "6px" }} />);
    } else {
      flushList();
      elements.push(<p key={elements.length} style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.7, margin: "2px 0" }}>{applyInline(trimmed)}</p>);
    }
  }
  flushList();
  return <>{elements}</>;
}

export function AIChat({ context }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const MAX_REQUESTS = 10; // soft UI limit per session

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setError(null);
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setLoading(true);

    // Add streaming placeholder
    const streamId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: streamId, role: "model", content: "", isStreaming: true }]);

    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMsgs.map((m) => ({ role: m.role, content: m.content })),
          context,
        }),
      });

      if (res.status === 429) {
        const data = await res.json() as { error: string };
        throw new Error(data.error || "Rate limit reached. Try again in 60s.");
      }

      if (!res.ok) {
        const data = await res.json() as { error: string };
        throw new Error(data.error || "AI request failed");
      }

      const data = await res.json() as { message: string };
      setMessages((prev) =>
        prev.map((m) => m.id === streamId ? { ...m, content: data.message, isStreaming: false } : m)
      );
      setRequestCount((c) => c + 1);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.id !== streamId));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, loading, context]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  }

  const isLimitReached = requestCount >= MAX_REQUESTS;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: "0" }}>

      {/* ── MESSAGES AREA ──────────────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "20px",
        display: "flex", flexDirection: "column", gap: "16px",
        scrollbarGutter: "stable",
      }}>
        {/* Welcome message */}
        {messages.length === 0 && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            flex: 1, gap: "16px", textAlign: "center", paddingBlock: "40px",
          }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(96,165,250,0.3), rgba(167,139,250,0.15))",
              border: "1.5px solid rgba(96,165,250,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px",
              boxShadow: "0 0 24px rgba(96,165,250,0.2)",
            }}>
              🤖
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "6px" }}>
                ToeflMaster AI
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)", maxWidth: "340px", lineHeight: 1.6 }}>
                Powered by Gemini 1.5 Flash · TOEFL ITP specialist. Ask me grammar rules, question explanations, or strategy tips.
              </p>
            </div>
            {context?.latestScore && (
              <div style={{ padding: "8px 16px", backgroundColor: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "var(--radius-full)" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "#60a5fa" }}>
                  📊 Your score: <strong>{context.latestScore}</strong> · Target: <strong>{context.targetScore}</strong>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              gap: "10px",
              alignItems: "flex-start",
              animation: "fadeInUp 200ms ease both",
            }}
          >
            {/* Avatar */}
            <div style={{
              flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%",
              backgroundColor: msg.role === "user" ? "var(--color-primary-500)" : "rgba(96,165,250,0.15)",
              border: `1px solid ${msg.role === "user" ? "transparent" : "rgba(96,165,250,0.3)"}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px",
            }}>
              {msg.role === "user" ? "👤" : "🤖"}
            </div>

            {/* Bubble */}
            <div style={{
              maxWidth: "82%",
              padding: "12px 16px",
              backgroundColor: msg.role === "user" ? "var(--color-primary-500)" : "var(--color-bg-card)",
              border: msg.role === "user" ? "none" : "1px solid var(--color-border)",
              borderRadius: msg.role === "user" ? "var(--radius-xl) var(--radius-md) var(--radius-md) var(--radius-xl)" : "var(--radius-md) var(--radius-xl) var(--radius-xl) var(--radius-md)",
            }}>
              {msg.isStreaming ? (
                <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "2px 0" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      backgroundColor: "rgba(96,165,250,0.7)",
                      animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
              ) : msg.role === "user" ? (
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "#fff", lineHeight: 1.6, margin: 0 }}>{msg.content}</p>
              ) : (
                <div style={{ lineHeight: 1.65 }}>{renderMarkdown(msg.content)}</div>
              )}
            </div>
          </div>
        ))}

        {/* Error banner */}
        {error && (
          <div style={{
            padding: "10px 14px", backgroundColor: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.3)", borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "#f87171",
            display: "flex", gap: "8px", alignItems: "center",
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── QUICK PROMPTS ─────────────────────────────────────── */}
      {messages.length === 0 && (
        <div style={{ padding: "0 20px 12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {QUICK_PROMPTS.map((qp) => (
            <button
              key={qp.label}
              type="button"
              onClick={() => void sendMessage(qp.prompt)}
              disabled={loading || isLimitReached}
              style={{
                padding: "6px 12px",
                backgroundColor: "rgba(96,165,250,0.08)",
                border: "1px solid rgba(96,165,250,0.25)",
                borderRadius: "var(--radius-full)",
                fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 600,
                color: "var(--color-primary-300)", cursor: "pointer",
                transition: "all 120ms ease",
              }}
            >
              {qp.label}
            </button>
          ))}
        </div>
      )}

      {/* ── RATE LIMIT BAR ─────────────────────────────────────── */}
      <div style={{ padding: "0 20px 8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ flex: 1, height: "3px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${(requestCount / MAX_REQUESTS) * 100}%`,
            backgroundColor: requestCount > 7 ? "#f87171" : "var(--color-primary-400)",
            borderRadius: "var(--radius-full)",
            transition: "width 300ms ease",
          }} />
        </div>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", flexShrink: 0 }}>
          {requestCount}/{MAX_REQUESTS}
        </span>
      </div>

      {/* ── INPUT AREA ─────────────────────────────────────────── */}
      <div style={{
        padding: "12px 20px 16px",
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-surface)",
      }}>
        {isLimitReached ? (
          <div style={{
            padding: "12px 16px", backgroundColor: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.25)", borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "#fbbf24", textAlign: "center",
          }}>
            Session limit reached (free tier). Refresh the page to continue. 🔄
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about grammar, question strategies, or TOEFL ITP…"
              rows={2}
              disabled={loading}
              style={{
                flex: 1, resize: "none",
                padding: "10px 14px",
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)",
                color: "var(--color-text-primary)",
                outline: "none",
                lineHeight: 1.5,
              }}
            />
            <button
              type="button"
              onClick={() => void sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                padding: "10px 16px", flexShrink: 0,
                backgroundColor: input.trim() && !loading ? "var(--color-primary-500)" : "rgba(255,255,255,0.06)",
                border: "none", borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700,
                color: input.trim() && !loading ? "#fff" : "var(--color-text-muted)",
                cursor: input.trim() && !loading ? "pointer" : "default",
                transition: "all 150ms ease",
                height: "42px",
              }}
            >
              {loading ? "…" : "Send"}
            </button>
          </div>
        )}
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", marginTop: "6px" }}>
          Enter to send · Shift+Enter for new line · Free tier: 10 requests/session
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
