"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useAppContext } from "@/app/context/AppContext";
import ExportMenu from "@/components/ExportMenu";

interface Budget {
  id: string; name: string; amount: number; spent: number; period: string;
  startDate: string; category?: { id: string; name: string; icon?: string };
}
interface Category { id: string; name: string; type: string; icon?: string }

export default function BudgetsPage() {
  const { t } = useAppContext();
  const d = t.dashboard.budgets;
  const c = t.dashboard;
  const ex = t.dashboard.export;

  const [budgets, setBudgets]       = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", categoryId: "", period: "MONTHLY", startDate: new Date().toISOString().split("T")[0] });
  const [saving, setSaving]         = useState(false);

  async function load() {
    const [b, cats] = await Promise.all([
      fetch("/api/budgets").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]);
    setBudgets(b); setCategories(cats); setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    await fetch("/api/budgets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setShowForm(false);
    setForm({ name: "", amount: "", categoryId: "", period: "MONTHLY", startDate: new Date().toISOString().split("T")[0] });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm(d.deleteConfirm)) return;
    await fetch(`/api/budgets/${id}`, { method: "DELETE" }); load();
  }

  const periodLabel = (p: string) => ({ WEEKLY: d.weekly, MONTHLY: d.monthly, QUARTERLY: d.quarterly, ANNUAL: d.annual }[p] ?? p);

  if (loading) return <div style={{ color: "var(--text-muted)", padding: "2rem" }}>{c.loading}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)" }}>{d.title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{d.subtitle}</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <ExportMenu
            filename="budgets"
            pdfTitle={d.title}
            headers={[d.nameLabel, d.categoryLabel, d.periodLabel, d.limitLabel, ex.spent, d.remaining, ex.status]}
            rows={() => budgets.map((b) => {
              const pct = (b.spent / b.amount) * 100;
              const over = b.spent > b.amount;
              return [
                b.name,
                b.category?.name ?? d.general,
                periodLabel(b.period),
                formatCurrency(b.amount),
                formatCurrency(b.spent),
                formatCurrency(Math.max(b.amount - b.spent, 0)),
                over ? ex.exceeded : pct >= 80 ? ex.warning : ex.ok,
              ];
            })}
          />
          <button onClick={() => setShowForm(true)} style={{ background: "#2563EB", color: "white", padding: "0.625rem 1.25rem", borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.875rem", whiteSpace: "nowrap" }}>
            {d.newBtn}
          </button>
        </div>
      </div>

      {/* Form Modal */}
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
                <label>{d.limitLabel}</label>
                <input type="number" step="0.01" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0,00" required />
              </div>
              <div>
                <label>{d.categoryLabel}</label>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">{d.noCategory}</option>
                  {categories.filter((cat) => cat.type === "EXPENSE").map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>{d.periodLabel}</label>
                <select value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}>
                  <option value="WEEKLY">{d.weekly}</option>
                  <option value="MONTHLY">{d.monthly}</option>
                  <option value="QUARTERLY">{d.quarterly}</option>
                  <option value="ANNUAL">{d.annual}</option>
                </select>
              </div>
              <div>
                <label>{d.startDateLabel}</label>
                <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
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

      {/* Budget Cards */}
      {budgets.length === 0 ? (
        <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🧾</div>
          <p>{d.empty}</p>
          <p style={{ fontSize: "0.875rem" }}>{d.emptyHint}</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {budgets.map((b) => {
            const pct  = Math.min((b.spent / b.amount) * 100, 100);
            const over = b.spent > b.amount;
            const warn = !over && pct >= 80;
            const barColor = over ? "#EF4444" : warn ? "#F59E0B" : "#22C55E";
            return (
              <div key={b.id} style={{ background: "var(--section-white)", border: `1px solid ${over ? "#FECACA" : "var(--border)"}`, borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "0.25rem" }}>{b.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {b.category?.icon} {b.category?.name ?? d.general} • {periodLabel(b.period)}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(b.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}>🗑</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)" }}>{formatCurrency(b.spent)}</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", alignSelf: "flex-end" }}>/ {formatCurrency(b.amount)}</span>
                </div>
                <div style={{ height: 8, background: "var(--background)", borderRadius: 100, marginBottom: "0.5rem" }}>
                  <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: barColor, transition: "width 0.3s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: barColor, fontWeight: 600 }}>
                    {over ? d.over : warn ? d.warn : `${pct.toFixed(0)}${d.used}`}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>{d.remaining} {formatCurrency(Math.max(b.amount - b.spent, 0))}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
