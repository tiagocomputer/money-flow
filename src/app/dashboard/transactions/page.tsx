"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAppContext } from "@/app/context/AppContext";

interface Transaction {
  id: string; amount: number; type: string; description?: string;
  date: string; recurring: boolean;
  category?: { id: string; name: string; color?: string; icon?: string };
  account: { id: string; name: string };
}
interface Category { id: string; name: string; type: string; icon?: string }
interface Account  { id: string; name: string }

export default function TransactionsPage() {
  const { t } = useAppContext();
  const d = t.dashboard.transactions;
  const c = t.dashboard;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories]     = useState<Category[]>([]);
  const [accounts, setAccounts]         = useState<Account[]>([]);
  const [loading, setLoading]           = useState(true);
  const [showForm, setShowForm]         = useState(false);
  const [filter, setFilter]             = useState("ALL");
  const [form, setForm] = useState({ accountId: "", categoryId: "", amount: "", type: "EXPENSE", description: "", date: new Date().toISOString().split("T")[0], recurring: false });
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState("");

  async function load() {
    const [tx, cats, accs] = await Promise.all([
      fetch("/api/transactions").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/accounts").then((r) => r.json()),
    ]);
    setTransactions(tx); setCategories(cats); setAccounts(accs);
    if (accs.length > 0) setForm((f) => ({ ...f, accountId: accs[0].id }));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    const res = await fetch("/api/transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json(); setSaving(false);
    if (!res.ok) { setError(data.error); } else {
      setShowForm(false);
      setForm({ accountId: accounts[0]?.id ?? "", categoryId: "", amount: "", type: "EXPENSE", description: "", date: new Date().toISOString().split("T")[0], recurring: false });
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(d.deleteConfirm)) return;
    await fetch(`/api/transactions/${id}`, { method: "DELETE" }); load();
  }

  const filtered = filter === "ALL" ? transactions : transactions.filter((t) => t.type === filter);

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

      {/* Filter pills */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[["ALL", d.filterAll], ["INCOME", d.filterIncome], ["EXPENSE", d.filterExpense]].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{ padding: "0.375rem 0.875rem", borderRadius: 100, border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, background: filter === key ? "#2563EB" : "var(--background)", color: filter === key ? "white" : "var(--text-muted)" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "var(--section-white)", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 480 }}>
            <h2 style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "1.5rem" }}>{d.modalTitle}</h2>
            {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "0.75rem", borderRadius: 8, marginBottom: "1rem", fontSize: "0.875rem" }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label>{d.typeLabel}</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="INCOME">{d.typeIncome}</option>
                    <option value="EXPENSE">{d.typeExpense}</option>
                    <option value="TRANSFER">{d.typeTransfer}</option>
                  </select>
                </div>
                <div>
                  <label>{d.amountLabel}</label>
                  <input type="number" step="0.01" min="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0,00" required />
                </div>
              </div>
              <div>
                <label>{d.accountLabel}</label>
                <select value={form.accountId} onChange={(e) => setForm({ ...form, accountId: e.target.value })} required>
                  {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label>{d.categoryLabel}</label>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">{d.noCategory}</option>
                  {categories.filter((cat) => cat.type === form.type || form.type === "TRANSFER").map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>{d.descLabel}</label>
                <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={d.descPlaceholder} />
              </div>
              <div>
                <label>{d.dateLabel}</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input type="checkbox" id="recurring" checked={form.recurring} onChange={(e) => setForm({ ...form, recurring: e.target.checked })} style={{ width: "auto" }} />
                <label htmlFor="recurring" style={{ margin: 0 }}>{d.recurringLabel}</label>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: "0.625rem", background: "var(--background)", color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>{c.cancel}</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "0.625rem", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? c.saving : d.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-scroll" style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💳</div>
            <p>{d.empty}</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }}>
                {[d.colDesc, d.colCategory, d.colAccount, d.colDate, d.colAmount, ""].map((h, i) => (
                  <th key={i} className={i === 1 || i === 2 ? "hide-mobile" : ""} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "var(--text-heading)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span>{tx.category?.icon ?? (tx.type === "INCOME" ? "📈" : "📉")}</span>
                      {tx.description ?? "—"}
                      {tx.recurring && <span style={{ fontSize: "0.65rem", background: "#EFF6FF", color: "#2563EB", padding: "0.1rem 0.4rem", borderRadius: 100, fontWeight: 700 }}>{d.recurringBadge}</span>}
                    </div>
                  </td>
                  <td className="hide-mobile" style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>{tx.category?.name ?? "—"}</td>
                  <td className="hide-mobile" style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>{tx.account.name}</td>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>{formatDate(tx.date)}</td>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", fontWeight: 700, color: tx.type === "INCOME" ? "#22C55E" : "#EF4444" }}>
                    {tx.type === "INCOME" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <button onClick={() => handleDelete(tx.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
