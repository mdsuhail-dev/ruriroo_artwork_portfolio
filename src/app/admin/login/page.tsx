"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password. Try again.");
        setPassword("");
        inputRef.current?.focus();
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0910] flex items-center justify-center px-4">
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,95,136,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: "rgba(19, 17, 26, 0.9)",
            border: "1px solid rgba(42, 34, 50, 0.9)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span style={{ color: "#E8C87A", fontSize: "1.2rem" }}>✦</span>
              <span
                style={{
                  fontFamily: "var(--font-caveat, cursive)",
                  fontSize: "1.6rem",
                  color: "#F0EBE3",
                }}
              >
                ruriroo._
              </span>
            </div>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#A09490",
              }}
            >
              Private Studio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#A09490",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <input
                ref={inputRef}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your secret"
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  background: "rgba(11, 9, 16, 0.8)",
                  border: `1px solid ${error ? "rgba(200,95,136,0.5)" : "rgba(42, 34, 50, 0.9)"}`,
                  borderRadius: "10px",
                  color: "#F0EBE3",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,95,136,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = error
                    ? "rgba(200,95,136,0.5)"
                    : "rgba(42, 34, 50, 0.9)")
                }
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: "0.8rem",
                  color: "#C85F88",
                  textAlign: "center",
                }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              style={{
                width: "100%",
                padding: "0.875rem",
                background: loading ? "rgba(200,95,136,0.5)" : "#C85F88",
                color: "#0B0910",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: loading || !password ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {loading ? "Entering..." : "Enter Studio"}
            </button>
          </form>
        </div>

        {/* Back link */}
        <p className="text-center mt-6" style={{ fontSize: "0.75rem", color: "#A09490" }}>
          <a
            href="/"
            style={{ color: "#A09490", textDecoration: "none" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#F0EBE3")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#A09490")
            }
          >
            ← Back to portfolio
          </a>
        </p>
      </motion.div>
    </div>
  );
}
