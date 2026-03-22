"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: string;
  startDate: string;
  category?: { id: string; name: string; icon?: string };
}

interface Category {
  id: string;
  name: string;
  type: string;
  icon?: string;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", categoryId: "", period: "MONTHLY", startDate: new Date().toISOString().split("T")[0] });
  const [saving, setSaving] = useState(false);

  async function load() {
    const [b, c] = await Promise.all([
      fetch("/api/budgets").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]);
    setBudgets(b);
    setCategories(c);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/budgets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setShowForm(false);
    setForm({ name: "", amount: "", categoryId: "", period: "MONTHLY", startDate: new Date().toISOString().split("T")[0] });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir orçamento?")) return;
    await fetch(`/api/budgets/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <div style={{ color: "#64748B", padding: "2rem" }}>Carregando...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>Orçamentos</h1>
          <p style={{ color: "#64748B", fontSize: "0.875rem" }}>Controle seus limites de gastos</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ background: "#2563EB", color: "white", padding: "0.625rem 1.25rem", borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
          + Novo Orçamento
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "white", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 440 }}>
            <h2 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "1.5rem" }}>Novo Orçamento</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label>Nome</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Alimentação do mês" required />
              </div>
              <div>
                <label>Limite (R$)</label>
                <input type="number" step="0.01" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0,00" required />
              </div>
              <div>
                <label>Categoria</label>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">Sem categoria</option>
                  {categories.filter((c) => c.type === "EXPENSE").map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Período</label>
                <select value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}>
                  <option value="WEEKLY">Semanal</option>
                  <option value="MONTHLY">Mensal</option>
                  <option value="QUARTERLY">Trimestral</option>
                  <option value="ANNUAL">Anual</option>
                </select>
              </div>
              <div>
                <label>Data de início</label>
                <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: "0.625rem", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "0.625rem", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Salvando..." : "Criar Orçamento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Budgets Grid */}
      {budgets.length === 0 ? (
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: "3rem", textAlign: "center", color: "#94A3B8" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🧾</div>
          <p>Nenhum orçamento criado</p>
          <p style={{ fontSize: "0.875rem" }}>Crie orçamentos para controlar seus gastos</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {budgets.map((b) => {
            const pct = Math.min((b.spent / b.amount) * 100, 100);
            const over = b.spent > b.amount;
            const warn = !over && pct >= 80;
            const barColor = over ? "#EF4444" : warn ? "#F59E0B" : "#22C55E";
            return (
              <div key={b.id} style={{ background: "white", border: `1px solid ${over ? "#FECACA" : "#E2E8F0"}`, borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0F172A", marginBottom: "0.25rem" }}>{b.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                      {b.category?.icon} {b.category?.name ?? "Geral"} • {b.period === "MONTHLY" ? "Mensal" : b.period === "WEEKLY" ? "Semanal" : b.period === "QUARTERLY" ? "Trimestral" : "Anual"}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(b.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: "0.8rem" }}>🗑</button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>{formatCurrency(b.spent)}</span>
                  <span style={{ fontSize: "0.875rem", color: "#64748B", alignSelf: "flex-end" }}>de {formatCurrency(b.amount)}</span>
                </div>

                <div style={{ height: 8, background: "#F1F5F9", borderRadius: 100, marginBottom: "0.5rem" }}>
                  <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: barColor, transition: "width 0.3s" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: barColor, fontWeight: 600 }}>
                    {over ? "Limite ultrapassado!" : warn ? "Atenção: 80%+" : `${pct.toFixed(0)}% utilizado`}
                  </span>
                  <span style={{ color: "#94A3B8" }}>Restam {formatCurrency(Math.max(b.amount - b.spent, 0))}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
