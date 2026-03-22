"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  createdAt: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [updateGoal, setUpdateGoal] = useState<Goal | null>(null);
  const [updateAmount, setUpdateAmount] = useState("");
  const [form, setForm] = useState({ name: "", targetAmount: "", currentAmount: "0", deadline: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await fetch("/api/goals").then((r) => r.json());
    setGoals(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/goals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setShowForm(false);
    setForm({ name: "", targetAmount: "", currentAmount: "0", deadline: "" });
    load();
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!updateGoal) return;
    setSaving(true);
    await fetch(`/api/goals/${updateGoal.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentAmount: updateAmount }) });
    setSaving(false);
    setUpdateGoal(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir meta?")) return;
    await fetch(`/api/goals/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <div style={{ color: "#64748B", padding: "2rem" }}>Carregando...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>Metas Financeiras</h1>
          <p style={{ color: "#64748B", fontSize: "0.875rem" }}>Defina e acompanhe seus objetivos</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ background: "#2563EB", color: "white", padding: "0.625rem 1.25rem", borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
          + Nova Meta
        </button>
      </div>

      {/* Create Form Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "white", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 440 }}>
            <h2 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "1.5rem" }}>Nova Meta</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label>Nome da meta</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Fundo de emergência" required />
              </div>
              <div>
                <label>Valor alvo (R$)</label>
                <input type="number" step="0.01" min="1" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} placeholder="0,00" required />
              </div>
              <div>
                <label>Valor atual (R$)</label>
                <input type="number" step="0.01" min="0" value={form.currentAmount} onChange={(e) => setForm({ ...form, currentAmount: e.target.value })} placeholder="0,00" />
              </div>
              <div>
                <label>Prazo (opcional)</label>
                <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: "0.625rem", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "0.625rem", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Salvando..." : "Criar Meta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Amount Modal */}
      {updateGoal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "white", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 380 }}>
            <h2 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>Atualizar progresso</h2>
            <p style={{ color: "#64748B", fontSize: "0.875rem", marginBottom: "1.5rem" }}>{updateGoal.name}</p>
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label>Valor atual (R$)</label>
                <input type="number" step="0.01" min="0" value={updateAmount} onChange={(e) => setUpdateAmount(e.target.value)} placeholder={formatCurrency(updateGoal.currentAmount)} required />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setUpdateGoal(null)} style={{ flex: 1, padding: "0.625rem", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "0.625rem", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Salvando..." : "Atualizar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: "3rem", textAlign: "center", color: "#94A3B8" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎯</div>
          <p>Nenhuma meta criada</p>
          <p style={{ fontSize: "0.875rem" }}>Defina objetivos financeiros para acompanhar seu progresso</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {goals.map((g) => {
            const pct = Math.min((g.currentAmount / g.targetAmount) * 100, 100);
            const reached = g.currentAmount >= g.targetAmount;
            return (
              <div key={g.id} style={{ background: "white", border: `1px solid ${reached ? "#BBF7D0" : "#E2E8F0"}`, borderRadius: 12, padding: "1.5rem", position: "relative" }}>
                {reached && (
                  <div style={{ position: "absolute", top: 12, right: 12, fontSize: "1.25rem" }}>🎉</div>
                )}
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "1rem", marginBottom: "0.25rem" }}>🎯 {g.name}</div>
                  {g.deadline && <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Prazo: {formatDate(g.deadline)}</div>}
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: 800, color: reached ? "#22C55E" : "#0F172A" }}>{formatCurrency(g.currentAmount)}</span>
                    <span style={{ fontSize: "0.875rem", color: "#64748B", alignSelf: "flex-end" }}>de {formatCurrency(g.targetAmount)}</span>
                  </div>
                  <div style={{ height: 10, background: "#F1F5F9", borderRadius: 100 }}>
                    <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: reached ? "#22C55E" : "#2563EB", transition: "width 0.3s" }} />
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "0.25rem" }}>
                    {reached ? "Meta atingida!" : `${pct.toFixed(1)}% — faltam ${formatCurrency(g.targetAmount - g.currentAmount)}`}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => { setUpdateGoal(g); setUpdateAmount(String(g.currentAmount)); }}
                    style={{ flex: 1, padding: "0.5rem", background: "#EFF6FF", color: "#2563EB", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Atualizar
                  </button>
                  <button onClick={() => handleDelete(g.id)} style={{ padding: "0.5rem 0.75rem", background: "#FEF2F2", color: "#EF4444", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem" }}>
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
