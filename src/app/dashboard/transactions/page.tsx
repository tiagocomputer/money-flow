"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description?: string;
  date: string;
  recurring: boolean;
  category?: { id: string; name: string; color?: string; icon?: string };
  account: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
  type: string;
  icon?: string;
}

interface Account {
  id: string;
  name: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [form, setForm] = useState({
    accountId: "",
    categoryId: "",
    amount: "",
    type: "EXPENSE",
    description: "",
    date: new Date().toISOString().split("T")[0],
    recurring: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const [tx, cats, accs] = await Promise.all([
      fetch("/api/transactions").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/accounts").then((r) => r.json()),
    ]);
    setTransactions(tx);
    setCategories(cats);
    setAccounts(accs);
    if (accs.length > 0) setForm((f) => ({ ...f, accountId: accs[0].id }));
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error);
    } else {
      setShowForm(false);
      setForm({ accountId: accounts[0]?.id ?? "", categoryId: "", amount: "", type: "EXPENSE", description: "", date: new Date().toISOString().split("T")[0], recurring: false });
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir transação?")) return;
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = filter === "ALL" ? transactions : transactions.filter((t) => t.type === filter);

  if (loading) return <div style={{ color: "#64748B", padding: "2rem" }}>Carregando...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>Transações</h1>
          <p style={{ color: "#64748B", fontSize: "0.875rem" }}>Gerencie suas entradas e saídas</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ background: "#2563EB", color: "white", padding: "0.625rem 1.25rem", borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.875rem", whiteSpace: "nowrap" }}>
          + Nova Transação
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {["ALL", "INCOME", "EXPENSE"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ padding: "0.375rem 0.875rem", borderRadius: 100, border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, background: filter === f ? "#2563EB" : "#F1F5F9", color: filter === f ? "white" : "#64748B" }}
          >
            {f === "ALL" ? "Todas" : f === "INCOME" ? "Receitas" : "Despesas"}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "white", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 480 }}>
            <h2 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "1.5rem" }}>Nova Transação</h2>
            {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "0.75rem", borderRadius: 8, marginBottom: "1rem", fontSize: "0.875rem" }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label>Tipo</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="INCOME">Receita</option>
                    <option value="EXPENSE">Despesa</option>
                    <option value="TRANSFER">Transferência</option>
                  </select>
                </div>
                <div>
                  <label>Valor (R$)</label>
                  <input type="number" step="0.01" min="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0,00" required />
                </div>
              </div>
              <div>
                <label>Conta</label>
                <select value={form.accountId} onChange={(e) => setForm({ ...form, accountId: e.target.value })} required>
                  {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label>Categoria</label>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">Sem categoria</option>
                  {categories.filter((c) => c.type === form.type || form.type === "TRANSFER").map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Descrição</label>
                <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Opcional" />
              </div>
              <div>
                <label>Data</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input type="checkbox" id="recurring" checked={form.recurring} onChange={(e) => setForm({ ...form, recurring: e.target.checked })} style={{ width: "auto" }} />
                <label htmlFor="recurring" style={{ margin: 0 }}>Recorrente</label>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: "0.625rem", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "0.625rem", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-scroll" style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#94A3B8" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💳</div>
            <p>Nenhuma transação encontrada</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Descrição</th>
                <th className="hide-mobile" style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Categoria</th>
                <th className="hide-mobile" style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Conta</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Data</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Valor</th>
                <th style={{ padding: "0.75rem 1rem" }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#0F172A" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1rem" }}>{tx.category?.icon ?? (tx.type === "INCOME" ? "📈" : "📉")}</span>
                      {tx.description ?? "-"}
                      {tx.recurring && <span style={{ fontSize: "0.65rem", background: "#EFF6FF", color: "#2563EB", padding: "0.1rem 0.4rem", borderRadius: 100, fontWeight: 700 }}>RECORRENTE</span>}
                    </div>
                  </td>
                  <td className="hide-mobile" style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B" }}>{tx.category?.name ?? "-"}</td>
                  <td className="hide-mobile" style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B" }}>{tx.account.name}</td>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B" }}>{formatDate(tx.date)}</td>
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
