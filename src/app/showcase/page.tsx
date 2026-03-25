"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeLangControls from "@/app/components/ThemeLangControls";
import ExportMenu from "@/components/ExportMenu";
import { useAppContext } from "@/app/context/AppContext";
import { formatCurrency } from "@/lib/utils";

/* ─── helpers ─────────────────────────────────────── */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ paddingTop: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
      {children}
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <Label>{label}</Label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  );
}

function Chip({ color, name, value }: { color: string; name: string; value: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  return (
    <button onClick={copy} title={`Copiar ${value}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer" }}>
      <div style={{ width: 56, height: 56, borderRadius: 12, background: color, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-heading)" }}>{name}</div>
        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{copied ? "✓ copiado" : value}</div>
      </div>
    </button>
  );
}

function ShowCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem", ...style }}>
      {children}
    </div>
  );
}

/* ─── main ─────────────────────────────────────────── */
export default function ShowcasePage() {
  const { t } = useAppContext();
  const [inputVal, setInputVal] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [checked, setChecked] = useState(false);

  const sections = [
    { id: "tokens",      icon: "🎨", label: "Design Tokens" },
    { id: "typography",  icon: "Aa", label: "Typography" },
    { id: "buttons",     icon: "🔘", label: "Buttons" },
    { id: "forms",       icon: "📝", label: "Form Controls" },
    { id: "cards",       icon: "🃏", label: "Cards" },
    { id: "progress",    icon: "📊", label: "Progress" },
    { id: "badges",      icon: "🏷", label: "Badges" },
    { id: "alerts",      icon: "🔔", label: "Alerts" },
    { id: "components",  icon: "🧩", label: "Components" },
  ];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex" }}>

      {/* ── Sidebar ─────────────────────────── */}
      <aside style={{
        width: 220, flexShrink: 0, position: "fixed", top: 0, left: 0, bottom: 0,
        background: "var(--section-white)", borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column", zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)" }}>
          <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.125rem" }}>💰</span>
            <span style={{ fontWeight: 800, color: "#2563EB", fontSize: "0.9rem" }}>MoneyFlow</span>
          </Link>
          <div style={{ marginTop: "0.375rem", fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Component Showcase
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem 0.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 0.625rem", borderRadius: 8,
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500,
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--background)"; e.currentTarget.style.color = "var(--text-heading)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              <span style={{ fontSize: "0.875rem", width: 20, textAlign: "center" }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)" }}>
          <ThemeLangControls compact dropdownDir="up" />
        </div>
      </aside>

      {/* ── Main content ────────────────────── */}
      <main style={{ marginLeft: 220, flex: 1, padding: "2rem", maxWidth: "calc(100% - 220px)" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--text-heading)", marginBottom: "0.375rem" }}>
              Component Showcase
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              Design system & component library — MoneyFlow
            </p>
          </div>
          <Link href="/dashboard" style={{ fontSize: "0.8rem", color: "#2563EB", textDecoration: "none", fontWeight: 600, padding: "0.5rem 0.875rem", border: "1px solid #2563EB", borderRadius: 8 }}>
            ← Dashboard
          </Link>
        </div>

        {/* ── TOKENS ──────────────────────────── */}
        <Section id="tokens" title="🎨 Design Tokens — Colors">
          <Group label="Brand">
            <Chip color="#2563EB" name="Primary" value="#2563EB" />
            <Chip color="#0EA5E9" name="Accent" value="#0EA5E9" />
            <Chip color="#6366F1" name="Indigo" value="#6366F1" />
          </Group>
          <Group label="Semantic">
            <Chip color="#22C55E" name="Success" value="#22C55E" />
            <Chip color="#F59E0B" name="Warning" value="#F59E0B" />
            <Chip color="#EF4444" name="Danger" value="#EF4444" />
            <Chip color="#94A3B8" name="Neutral" value="#94A3B8" />
          </Group>
          <Group label="Surfaces (current theme)">
            <Chip color="var(--background)" name="Background" value="--background" />
            <Chip color="var(--section-white)" name="Surface" value="--section-white" />
            <Chip color="var(--border)" name="Border" value="--border" />
            <Chip color="var(--text-heading)" name="Heading" value="--text-heading" />
            <Chip color="var(--text-muted)" name="Muted" value="--text-muted" />
          </Group>
        </Section>

        {/* ── TYPOGRAPHY ─────────────────────── */}
        <Section id="typography" title="Aa Typography">
          <ShowCard>
            {[
              { size: "2.25rem", weight: 900, label: "Heading 1 — 36px / 900", text: "Controle suas finanças" },
              { size: "1.5rem",  weight: 800, label: "Heading 2 — 24px / 800", text: "Dashboard financeiro" },
              { size: "1.125rem",weight: 700, label: "Heading 3 — 18px / 700", text: "Transações recentes" },
              { size: "1rem",    weight: 600, label: "Body Large — 16px / 600", text: "Gerencie seus gastos mensais" },
              { size: "0.875rem",weight: 400, label: "Body — 14px / 400", text: "Registre entradas e saídas com categorização automática." },
              { size: "0.75rem", weight: 500, label: "Caption — 12px / 500", text: "ÚLTIMA ATUALIZAÇÃO • RECORRENTE • ATIVO" },
            ].map((t) => (
              <div key={t.label} style={{ paddingBottom: "1rem", marginBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "0.25rem", fontFamily: "monospace" }}>{t.label}</div>
                <div style={{ fontSize: t.size, fontWeight: t.weight, color: "var(--text-heading)", lineHeight: 1.3 }}>{t.text}</div>
              </div>
            ))}
          </ShowCard>
        </Section>

        {/* ── BUTTONS ────────────────────────── */}
        <Section id="buttons" title="🔘 Buttons">
          <Group label="Variants">
            <button className="btn-primary">Primary</button>
            <button className="btn-secondary">Secondary</button>
            <button style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", padding: "0.625rem 1.25rem", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Danger</button>
            <button style={{ background: "var(--background)", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "0.625rem 1.25rem", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Ghost</button>
          </Group>
          <Group label="Sizes">
            <button className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.375rem 0.75rem" }}>Small</button>
            <button className="btn-primary">Medium</button>
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>Large</button>
          </Group>
          <Group label="States">
            <button className="btn-primary" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>Disabled</button>
            <button className="btn-primary" style={{ opacity: 0.7, cursor: "wait" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Loading
              </span>
            </button>
            <button className="btn-primary" style={{ minWidth: 180 }}>
              + Nova Transação
            </button>
          </Group>
          <Group label="Icon Buttons">
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: "1.1rem", padding: "0.25rem 0.5rem" }}>🗑</button>
            <button style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "#EFF6FF", color: "#2563EB", border: "none", borderRadius: 8, padding: "0.5rem 0.75rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>
              ✏️ Editar
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "#F0FDF4", color: "#22C55E", border: "none", borderRadius: 8, padding: "0.5rem 0.75rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>
              ✓ Confirmar
            </button>
          </Group>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </Section>

        {/* ── FORMS ──────────────────────────── */}
        <Section id="forms" title="📝 Form Controls">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <ShowCard>
              <Label>Text Input</Label>
              <label>Nome completo</label>
              <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="Seu nome completo" style={{ marginBottom: "0.5rem" }} />
              <label>Email</label>
              <input type="email" placeholder="seu@email.com" />
            </ShowCard>

            <ShowCard>
              <Label>States</Label>
              <label>Normal</label>
              <input placeholder="Placeholder..." style={{ marginBottom: "0.5rem" }} />
              <label>Error</label>
              <input placeholder="Inválido" style={{ borderColor: "#EF4444", marginBottom: "0.5rem" }} />
              <label>Success</label>
              <input placeholder="Válido" style={{ borderColor: "#22C55E" }} />
            </ShowCard>

            <ShowCard>
              <Label>Select</Label>
              <label>Tipo</label>
              <select value={selectVal} onChange={(e) => setSelectVal(e.target.value)} style={{ marginBottom: "0.5rem" }}>
                <option value="">Selecione...</option>
                <option value="INCOME">Receita</option>
                <option value="EXPENSE">Despesa</option>
                <option value="TRANSFER">Transferência</option>
              </select>
              <label>Período</label>
              <select>
                <option>Mensal</option>
                <option>Semanal</option>
                <option>Anual</option>
              </select>
            </ShowCard>

            <ShowCard>
              <Label>Number & Date</Label>
              <label>Valor (R$)</label>
              <input type="number" placeholder="0,00" step="0.01" style={{ marginBottom: "0.5rem" }} />
              <label>Data</label>
              <input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </ShowCard>

            <ShowCard>
              <Label>Checkbox</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.25rem" }}>
                {["Recorrente", "Notificar ao atingir 80%", "Privado"].map((label, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                      type="checkbox"
                      id={`chk-${i}`}
                      checked={i === 0 ? checked : i === 1}
                      onChange={i === 0 ? (e) => setChecked(e.target.checked) : undefined}
                      style={{ width: "auto" }}
                    />
                    <label htmlFor={`chk-${i}`} style={{ margin: 0, cursor: "pointer" }}>{label}</label>
                  </div>
                ))}
              </div>
            </ShowCard>
          </div>
        </Section>

        {/* ── CARDS ──────────────────────────── */}
        <Section id="cards" title="🃏 Cards">
          <Label>KPI Cards</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Saldo Total",    value: formatCurrency(23740.5), icon: "💰", color: "#2563EB", bg: "#EFF6FF" },
              { label: "Receitas (mês)", value: formatCurrency(7500),    icon: "📈", color: "#22C55E", bg: "#F0FDF4" },
              { label: "Despesas (mês)", value: formatCurrency(3650),    icon: "📉", color: "#EF4444", bg: "#FEF2F2" },
              { label: "Fluxo de Caixa",value: formatCurrency(3850),    icon: "💹", color: "#22C55E", bg: "#F0FDF4" },
            ].map((kpi) => (
              <ShowCard key={kpi.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.label}</span>
                  <div style={{ width: 30, height: 30, background: kpi.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>{kpi.icon}</div>
                </div>
                <div style={{ fontSize: "1.375rem", fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
              </ShowCard>
            ))}
          </div>

          <Label>Budget Cards</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { name: "Alimentação",  amount: 700,  spent: 580,  icon: "🍔", ok: true  },
              { name: "Transporte",   amount: 350,  spent: 295,  icon: "🚗", warn: true },
              { name: "Lazer",        amount: 250,  spent: 270,  icon: "🎮", over: true },
            ].map((b) => {
              const pct = Math.min((b.spent / b.amount) * 100, 100);
              const color = b.over ? "#EF4444" : b.warn ? "#F59E0B" : "#22C55E";
              return (
                <div key={b.name} style={{ background: "var(--section-white)", border: `1px solid ${b.over ? "#FECACA" : "var(--border)"}`, borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "0.9rem" }}>{b.icon} {b.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Orçamento mensal</div>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)" }}>{formatCurrency(b.spent)}</span>
                  </div>
                  <div style={{ height: 8, background: "var(--background)", borderRadius: 100, marginBottom: "0.5rem" }}>
                    <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: color, transition: "width 0.3s" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span style={{ color, fontWeight: 600 }}>{b.over ? "Limite ultrapassado!" : b.warn ? "Atenção: 80%+" : `${pct.toFixed(0)}% utilizado`}</span>
                    <span style={{ color: "var(--text-muted)" }}>/ {formatCurrency(b.amount)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Label>Goal Cards</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {[
              { name: "Reserva de emergência", target: 36000, current: 18500 },
              { name: "Viagem para Europa",    target: 15000, current: 6200  },
              { name: "Novo notebook",         target: 6000,  current: 6000  },
            ].map((g) => {
              const pct = Math.min((g.current / g.target) * 100, 100);
              const reached = g.current >= g.target;
              return (
                <div key={g.name} style={{ background: "var(--section-white)", border: `1px solid ${reached ? "#BBF7D0" : "var(--border)"}`, borderRadius: 12, padding: "1.25rem", position: "relative" }}>
                  {reached && <div style={{ position: "absolute", top: 12, right: 12, fontSize: "1.25rem" }}>🎉</div>}
                  <div style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "0.75rem" }}>🎯 {g.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.375rem", fontWeight: 800, color: reached ? "#22C55E" : "var(--text-heading)" }}>{formatCurrency(g.current)}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "flex-end" }}>/ {formatCurrency(g.target)}</span>
                  </div>
                  <div style={{ height: 10, background: "var(--background)", borderRadius: 100, marginBottom: "0.375rem" }}>
                    <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: reached ? "#22C55E" : "#2563EB", transition: "width 0.3s" }} />
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {reached ? "Meta atingida!" : `${pct.toFixed(1)}% — faltam ${formatCurrency(g.target - g.current)}`}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── PROGRESS ───────────────────────── */}
        <Section id="progress" title="📊 Progress Bars">
          <ShowCard>
            {[
              { label: "Success (65%)",  pct: 65,  color: "#22C55E" },
              { label: "Warning (82%)",  pct: 82,  color: "#F59E0B" },
              { label: "Danger (100%)",  pct: 100, color: "#EF4444" },
              { label: "Primary (40%)",  pct: 40,  color: "#2563EB" },
            ].map((p) => (
              <div key={p.label} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-heading)" }}>{p.label}</span>
                  <span style={{ fontSize: "0.75rem", color: p.color, fontWeight: 700 }}>{p.pct}%</span>
                </div>
                <div style={{ height: 8, background: "var(--background)", borderRadius: 100 }}>
                  <div style={{ height: "100%", width: `${p.pct}%`, borderRadius: 100, background: p.color, transition: "width 0.3s" }} />
                </div>
              </div>
            ))}
          </ShowCard>
        </Section>

        {/* ── BADGES ─────────────────────────── */}
        <Section id="badges" title="🏷 Badges & Tags">
          <Group label="Status">
            {[
              { label: "PRO",       bg: "#2563EB", color: "white" },
              { label: "TRIAL",     bg: "#0EA5E9", color: "white" },
              { label: "FREE",      bg: "#E2E8F0", color: "#64748B" },
              { label: "ATIVO",     bg: "#DCFCE7", color: "#16A34A" },
              { label: "INATIVO",   bg: "#FEF2F2", color: "#DC2626" },
            ].map((b) => (
              <span key={b.label} style={{ padding: "0.2rem 0.7rem", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, background: b.bg, color: b.color }}>
                {b.label}
              </span>
            ))}
          </Group>
          <Group label="Inline labels">
            <span style={{ fontSize: "0.65rem", background: "#EFF6FF", color: "#2563EB", padding: "0.1rem 0.4rem", borderRadius: 100, fontWeight: 700 }}>RECORRENTE</span>
            <span style={{ fontSize: "0.65rem", background: "#F0FDF4", color: "#22C55E", padding: "0.1rem 0.4rem", borderRadius: 100, fontWeight: 700 }}>✓ OK</span>
            <span style={{ fontSize: "0.65rem", background: "#FFF7ED", color: "#C2410C", padding: "0.1rem 0.4rem", borderRadius: 100, fontWeight: 700 }}>⚠ ATENÇÃO</span>
            <span style={{ fontSize: "0.65rem", background: "#FEF2F2", color: "#DC2626", padding: "0.1rem 0.4rem", borderRadius: 100, fontWeight: 700 }}>✕ EXCEDIDO</span>
            <span style={{ fontSize: "0.65rem", background: "#F3F4F6", color: "#6B7280", padding: "0.1rem 0.4rem", borderRadius: 100, fontWeight: 700 }}>META ATINGIDA 🎉</span>
          </Group>
        </Section>

        {/* ── ALERTS ─────────────────────────── */}
        <Section id="alerts" title="🔔 Alerts & Notifications">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { bg: "#EFF6FF", border: "#BFDBFE", color: "#1D4ED8", icon: "ℹ️", msg: "Informação: Seus dados foram salvos com sucesso." },
              { bg: "#F0FDF4", border: "#BBF7D0", color: "#16A34A", icon: "✅", msg: "Sucesso: Meta atingida! Parabéns pela conquista." },
              { bg: "#FFF7ED", border: "#FED7AA", color: "#92400E", icon: "⚠️", msg: "Atenção: Orçamento de Alimentação atingiu 82% do limite." },
              { bg: "#FEF2F2", border: "#FECACA", color: "#DC2626", icon: "🚫", msg: "Erro: O e-mail informado já está em uso." },
            ].map((a) => (
              <div key={a.icon} style={{ background: a.bg, border: `1px solid ${a.border}`, borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.875rem", color: a.color, display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span>{a.icon}</span>
                {a.msg}
              </div>
            ))}
          </div>
        </Section>

        {/* ── COMPONENTS ─────────────────────── */}
        <Section id="components" title="🧩 Components">
          <Label>ExportMenu — Interactive</Label>
          <ShowCard style={{ display: "inline-block", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Clique no botão para testar a exportação com dados de amostra.
            </p>
            <ExportMenu
              filename="showcase-sample"
              pdfTitle="Relatório de Exemplo"
              headers={["Descrição", "Categoria", "Data", "Valor"]}
              rows={() => [
                ["Salário mensal",      "Receita",     "05/03/2026", "+R$ 7.500,00"],
                ["Supermercado",        "Alimentação", "07/03/2026", "-R$ 380,00"  ],
                ["Aluguel",             "Moradia",     "10/03/2026", "-R$ 2.100,00"],
                ["Projeto freelance",   "Freelance",   "20/03/2026", "+R$ 2.200,00"],
                ["Combustível",         "Transporte",  "12/03/2026", "-R$ 260,00"  ],
              ]}
            />
          </ShowCard>

          <Label>ThemeLangControls</Label>
          <ShowCard style={{ display: "inline-block", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Controles de tema e idioma — altere e veja o showcase atualizar em tempo real.
            </p>
            <ThemeLangControls />
          </ShowCard>

          <Label>Navigation Item (active state)</Label>
          <ShowCard style={{ maxWidth: 240 }}>
            {[
              { icon: "🏠", label: "Dashboard", active: false },
              { icon: "💳", label: "Transações", active: true  },
              { icon: "🧾", label: "Orçamentos", active: false },
              { icon: "🎯", label: "Metas",      active: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex", alignItems: "center", gap: "0.625rem",
                  padding: "0.5625rem 0.75rem", borderRadius: 8, marginBottom: "0.125rem",
                  background: item.active ? "#EFF6FF" : "transparent",
                  color: item.active ? "#2563EB" : "var(--text-muted)",
                  fontWeight: item.active ? 600 : 400, fontSize: "0.875rem",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
                {item.active && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }} />}
              </div>
            ))}
          </ShowCard>
        </Section>

        {/* Footer */}
        <div style={{ padding: "2rem 0", textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem" }}>
          MoneyFlow Component Showcase • {new Date().getFullYear()} • Mude o tema e idioma no painel esquerdo
        </div>
      </main>
    </div>
  );
}
