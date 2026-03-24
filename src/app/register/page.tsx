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

function validate(form: { name: string; email: string; password: string; confirmPassword: string }) {
  if (form.name.trim().length < 2) return "O nome deve ter pelo menos 2 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Informe um e-mail válido.";
  if (form.password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (form.password !== form.confirmPassword) return "As senhas não coincidem.";
  return null;
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = (searchParams.get("plan") ?? "free") as keyof typeof planConfig;
  const config = planConfig[planKey] ?? planConfig.free;

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate(form);
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, plan: config.apiPlan }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/dashboard");
    }
  }

  const passwordMatch = form.confirmPassword.length > 0 && form.password === form.confirmPassword;
  const passwordMismatch = form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

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

          {/* Google button */}
          <a
            href={`/api/auth/google?plan=${config.apiPlan}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
              width: "100%", padding: "0.7rem", borderRadius: 8, border: "1px solid var(--border, #E2E8F0)",
              background: "var(--section-white, white)", color: "var(--text-heading, #0F172A)",
              fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
              <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
              <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
              <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
            </svg>
            Continuar com Google
          </a>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border, #E2E8F0)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted, #94A3B8)" }}>ou cadastre-se com e-mail</span>
            <div style={{ flex: 1, height: 1, background: "var(--border, #E2E8F0)" }} />
          </div>

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
                minLength={2}
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
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                required
                style={{ background: "var(--section-bg, #F8FAFC)", color: "var(--foreground, #0F172A)", borderColor: "var(--border, #E2E8F0)" }}
              />
              {form.password.length > 0 && form.password.length < 8 && (
                <p style={{ fontSize: "0.75rem", color: "#F59E0B", marginTop: "0.25rem" }}>
                  {8 - form.password.length} caractere(s) restante(s)
                </p>
              )}
            </div>
            <div>
              <label style={{ color: "var(--text-heading, #0F172A)" }}>Confirmar senha</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Repita a senha"
                required
                style={{
                  background: "var(--section-bg, #F8FAFC)",
                  color: "var(--foreground, #0F172A)",
                  borderColor: passwordMismatch ? "#EF4444" : passwordMatch ? "#22C55E" : "var(--border, #E2E8F0)",
                }}
              />
              {passwordMatch && (
                <p style={{ fontSize: "0.75rem", color: "#22C55E", marginTop: "0.25rem" }}>✓ Senhas coincidem</p>
              )}
              {passwordMismatch && (
                <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>As senhas não coincidem</p>
              )}
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
