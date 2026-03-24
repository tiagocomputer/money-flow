"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeLangControls from "@/app/components/ThemeLangControls";
import { useAppContext } from "@/app/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useAppContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--section-bg, #F8FAFC)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative" }}>

      {/* Top-right controls */}
      <div style={{ position: "fixed", top: "1rem", right: "1.25rem", zIndex: 50 }}>
        <ThemeLangControls />
      </div>

      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "2rem" }}>💰</span>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "#2563EB", letterSpacing: "-0.02em" }}>MoneyFlow</span>
          </Link>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-heading, #0F172A)", marginBottom: "0.375rem" }}>{t.login.title}</h1>
          <p style={{ color: "var(--text-muted, #64748B)", fontSize: "0.875rem" }}>{t.login.subtitle}</p>
        </div>

        {/* Card */}
        <div style={{ background: "var(--section-white, white)", border: "1px solid var(--border, #E2E8F0)", borderRadius: 16, padding: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {error && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "0.75rem", borderRadius: 8, fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span>⚠️</span>
                {error}
              </div>
            )}
            <div>
              <label style={{ color: "var(--text-heading, #0F172A)" }}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t.login.emailPlaceholder}
                required
                style={{ background: "var(--section-bg, #F8FAFC)", color: "var(--foreground, #0F172A)", borderColor: "var(--border, #E2E8F0)" }}
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
                <label style={{ margin: 0, color: "var(--text-heading, #0F172A)" }}>{t.login.passwordLabel}</label>
              </div>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                style={{ background: "var(--section-bg, #F8FAFC)", color: "var(--foreground, #0F172A)", borderColor: "var(--border, #E2E8F0)" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#93C5FD" : "#2563EB",
                color: "white",
                padding: "0.75rem",
                borderRadius: 8,
                fontWeight: 700,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "0.9rem",
                transition: "background 0.15s",
              }}
            >
              {loading ? t.login.submitting : t.login.submitBtn}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--text-muted, #64748B)" }}>
            {t.login.noAccount}{" "}
            <Link href="/register" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>
              {t.login.createAccount}
            </Link>
          </div>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "var(--text-muted, #64748B)", fontSize: "0.8125rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
            {t.login.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
