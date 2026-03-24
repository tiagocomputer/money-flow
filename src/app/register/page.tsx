"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ThemeLangControls from "@/app/components/ThemeLangControls";

const planConfig = {
  pro: {
    label: "PRO",
    badge: "💎 Plano PRO",
    badgeBg: "#2563EB",
    title: "Criar sua conta PRO",
    subtitle: "R$ 97/mês — Acesso completo, contas e transações ilimitadas",
    btnText: "Assinar PRO",
    btnBg: "#2563EB",
    apiPlan: "PRO",
    borderColor: "#2563EB",
  },
  trial: {
    label: "TRIAL",
    badge: "✨ 14 dias grátis",
    badgeBg: "#0EA5E9",
    title: "Começar trial gratuito",
    subtitle: "14 dias com tudo ilimitado, sem cartão de crédito",
    btnText: "Iniciar trial grátis",
    btnBg: "#0EA5E9",
    apiPlan: "TRIAL",
    borderColor: "#0EA5E9",
  },
  free: {
    label: "FREE",
    badge: null,
    badgeBg: "",
    title: "Criar conta grátis",
    subtitle: "14 dias de trial com tudo ilimitado",
    btnText: "Criar conta grátis",
    btnBg: "#2563EB",
    apiPlan: "FREE",
    borderColor: "var(--border, #E2E8F0)",
  },
};

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = (searchParams.get("plan") ?? "free") as keyof typeof planConfig;
  const config = planConfig[planKey] ?? planConfig.free;

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, plan: config.apiPlan }),
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
        {/* Logo + plan badge */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "2rem" }}>💰</span>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "#2563EB", letterSpacing: "-0.02em" }}>MoneyFlow</span>
          </Link>

          {config.badge && (
            <div style={{ display: "inline-block", background: config.badgeBg, color: "white", padding: "0.3rem 1rem", borderRadius: 100, fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.875rem" }}>
              {config.badge}
            </div>
          )}

          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-heading, #0F172A)", marginBottom: "0.375rem" }}>{config.title}</h1>
          <p style={{ color: "var(--text-muted, #64748B)", fontSize: "0.875rem" }}>{config.subtitle}</p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--section-white, white)",
          border: `${planKey === "pro" ? 2 : 1}px solid ${config.borderColor}`,
          borderRadius: 16,
          padding: "2rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {error && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "0.75rem", borderRadius: 8, fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span>⚠️</span>
                {error}
              </div>
            )}
            <div>
              <label style={{ color: "var(--text-heading, #0F172A)" }}>Nome completo</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Seu nome"
                required
                style={{ background: "var(--section-bg, #F8FAFC)", color: "var(--foreground, #0F172A)", borderColor: "var(--border, #E2E8F0)" }}
              />
            </div>
            <div>
              <label style={{ color: "var(--text-heading, #0F172A)" }}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                required
                style={{ background: "var(--section-bg, #F8FAFC)", color: "var(--foreground, #0F172A)", borderColor: "var(--border, #E2E8F0)" }}
              />
            </div>
            <div>
              <label style={{ color: "var(--text-heading, #0F172A)" }}>Senha</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
                style={{ background: "var(--section-bg, #F8FAFC)", color: "var(--foreground, #0F172A)", borderColor: "var(--border, #E2E8F0)" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? `${config.btnBg}99` : config.btnBg,
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
              {loading ? "Criando conta…" : config.btnText}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted, #94A3B8)" }}>
            Ao criar uma conta, você concorda com os Termos de Uso e Política de Privacidade.
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.875rem", color: "var(--text-muted, #64748B)" }}>
            Já tem conta?{" "}
            <Link href="/login" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>
              Entrar
            </Link>
          </div>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "var(--text-muted, #64748B)", fontSize: "0.8125rem", textDecoration: "none" }}>
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
