"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAppContext } from "@/app/context/AppContext";

interface Goal {
  id: string; name: string; targetAmount: number; currentAmount: number;
  deadline?: string; createdAt: string;
}

export default function GoalsPage() {
  const { t } = useAppContext();
  const d = t.dashboard.goals;
  const c = t.dashboard;

  const [goals, setGoals]           = useState<Goal[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [updateGoal, setUpdateGoal] = useState<Goal | null>(null);
  const [updateAmount, setUpdateAmount] = useState("");
  const [form, setForm] = useState({ name: "", targetAmount: "", currentAmount: "0", deadline: "" });
  const [saving, setSaving]         = useState(false);

  async function load() {
    const data = await fetch("/api/goals").then((r) => r.json());
    setGoals(data); setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    await fetch("/api/goals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setShowForm(false);
    setForm({ name: "", targetAmount: "", currentAmount: "0", deadline: "" }); load();
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!updateGoal) return;
    setSaving(true);
    await fetch(`/api/goals/${updateGoal.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentAmount: updateAmount }) });
    setSaving(false); setUpdateGoal(null); load();
  }

  async function handleDelete(id: string) {
    if (!confirm(d.deleteConfirm)) return;
    await fetch(`/api/goals/${id}`, { method: "DELETE" }); load();
  }

  if (loading) return <div style={{ color: "var(--text-muted)", padding: "2rem" }}>{c.loading}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)" }}>{d.title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{d.subtitle}</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ background: "#2563EB", color: "white", padding: "0.625rem 1.25rem", borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.875rem", whiteSpace: "nowrap" }}>
          {d.newBtn}
        </button>
      </div>

      {/* Create Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "var(--section-white)", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 440 }}>
            <h2 style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "1.5rem" }}>{d.modalTitle}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label>{d.nameLabel}</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={d.namePlaceholder} required />
              </div>
              <div>
                <label>{d.targetLabel}</label>
                <input type="number" step="0.01" min="1" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} placeholder="0,00" required />
              </div>
              <div>
                <label>{d.currentLabel}</label>
                <input type="number" step="0.01" min="0" value={form.currentAmount} onChange={(e) => setForm({ ...form, currentAmount: e.target.value })} placeholder="0,00" />
              </div>
              <div>
                <label>{d.deadlineLabel}</label>
                <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: "0.625rem", background: "var(--background)", color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>{c.cancel}</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "0.625rem", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? c.saving : d.createBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateGoal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "var(--section-white)", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 380 }}>
            <h2 style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "0.5rem" }}>{d.updateTitle}</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>{updateGoal.name}</p>
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label>{d.updateCurrentLabel}</label>
                <input type="number" step="0.01" min="0" value={updateAmount} onChange={(e) => setUpdateAmount(e.target.value)} placeholder={formatCurrency(updateGoal.currentAmount)} required />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setUpdateGoal(null)} style={{ flex: 1, padding: "0.625rem", background: "var(--background)", color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>{c.cancel}</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "0.625rem", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? c.saving : d.updateBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎯</div>
          <p>{d.empty}</p>
          <p style={{ fontSize: "0.875rem" }}>{d.emptyHint}</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {goals.map((g) => {
            const pct     = Math.min((g.currentAmount / g.targetAmount) * 100, 100);
            const reached = g.currentAmount >= g.targetAmount;
            return (
              <div key={g.id} style={{ background: "var(--section-white)", border: `1px solid ${reached ? "#BBF7D0" : "var(--border)"}`, borderRadius: 12, padding: "1.5rem", position: "relative" }}>
                {reached && <div style={{ position: "absolute", top: 12, right: 12, fontSize: "1.25rem" }}>🎉</div>}
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "1rem", marginBottom: "0.25rem" }}>🎯 {g.name}</div>
                  {g.deadline && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{d.deadline} {formatDate(g.deadline)}</div>}
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: 800, color: reached ? "#22C55E" : "var(--text-heading)" }}>{formatCurrency(g.currentAmount)}</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", alignSelf: "flex-end" }}>/ {formatCurrency(g.targetAmount)}</span>
                  </div>
                  <div style={{ height: 10, background: "var(--background)", borderRadius: 100 }}>
                    <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: reached ? "#22C55E" : "#2563EB", transition: "width 0.3s" }} />
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    {reached ? d.reached : `${pct.toFixed(1)}% — ${d.remaining} ${formatCurrency(g.targetAmount - g.currentAmount)}`}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => { setUpdateGoal(g); setUpdateAmount(String(g.currentAmount)); }} style={{ flex: 1, padding: "0.5rem", background: "#EFF6FF", color: "#2563EB", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>
                    {d.updateAction}
                  </button>
                  <button onClick={() => handleDelete(g.id)} style={{ padding: "0.5rem 0.75rem", background: "#FEF2F2", color: "#EF4444", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem" }}>🗑</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
