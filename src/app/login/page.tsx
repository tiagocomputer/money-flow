"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
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
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "2rem" }}>💰</span>
              <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "#2563EB" }}>MoneyFlow</span>
            </div>
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>Entrar na sua conta</h1>
          <p style={{ color: "#64748B", fontSize: "0.875rem" }}>Bem-vindo de volta!</p>
        </div>

        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: "2rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {error && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "0.75rem", borderRadius: 8, fontSize: "0.875rem" }}>
                {error}
              </div>
            )}
            <div>
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label>Senha</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ background: "#2563EB", color: "white", padding: "0.75rem", borderRadius: 8, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontSize: "0.9rem" }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#64748B" }}>
            Não tem conta?{" "}
            <Link href="/register" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>
              Criar conta grátis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
