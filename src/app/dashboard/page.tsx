"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAppContext } from "@/app/context/AppContext";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import ExportMenu from "@/components/ExportMenu";

const COLORS = ["#2563EB", "#0EA5E9", "#6366F1", "#EC4899", "#F59E0B", "#22C55E", "#8B5CF6"];

interface DashboardData {
  totalBalance: number; income: number; expenses: number; cashFlow: number;
  accounts: Array<{ id: string; name: string; balance: number; type: string; color?: string }>;
  recentTransactions: Array<{ id: string; amount: number; type: string; description?: string; date: string; recurring: boolean; category?: { name: string; color?: string; icon?: string }; account: { name: string } }>;
  budgets: Array<{ id: string; name: string; amount: number; spent: number; category?: { name: string } }>;
  goals: Array<{ id: string; name: string; targetAmount: number; currentAmount: number; deadline?: string }>;
  notifications: Array<{ id: string; message: string; type: string; createdAt: string }>;
  chartData: Array<{ month: string; receitas: number; despesas: number }>;
  categoryChart: Array<{ name: string; value: number }>;
}

export default function DashboardPage() {
  const { t } = useAppContext();
  const d = t.dashboard;
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard").then((r) => r.json()).then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
      <div style={{ color: "var(--text-muted)" }}>{d.loading}</div>
    </div>
  );
  if (!data) return null;

  const kpis = [
    { label: d.home.totalBalance, value: formatCurrency(data.totalBalance), icon: "💰", color: "#2563EB", bg: "#EFF6FF" },
    { label: d.home.income,       value: formatCurrency(data.income),       icon: "📈", color: "#22C55E", bg: "#F0FDF4" },
    { label: d.home.expenses,     value: formatCurrency(data.expenses),     icon: "📉", color: "#EF4444", bg: "#FEF2F2" },
    { label: d.home.cashFlow,     value: formatCurrency(data.cashFlow),     icon: "💹", color: data.cashFlow >= 0 ? "#22C55E" : "#EF4444", bg: data.cashFlow >= 0 ? "#F0FDF4" : "#FEF2F2" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)" }}>{d.home.title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{d.home.subtitle}</p>
        </div>
        <ExportMenu
          filename="resumo-financeiro"
          pdfTitle="Resumo Financeiro"
          headers={["Métrica", "Valor"]}
          rows={() => [
            ["Saldo Total", formatCurrency(data.totalBalance)],
            ["Receitas do Mês", formatCurrency(data.income)],
            ["Despesas do Mês", formatCurrency(data.expenses)],
            ["Fluxo de Caixa", formatCurrency(data.cashFlow)],
            ...data.accounts.map((a) => [`Conta: ${a.name}`, formatCurrency(a.balance)]),
          ]}
        />
      </div>

      {data.notifications.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {data.notifications.map((n) => (
            <div key={n.id} style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#92400E", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🔔 {n.message}
            </div>
          ))}
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.label}</span>
              <div style={{ width: 32, height: 32, background: kpi.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{kpi.icon}</div>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="responsive-grid-charts" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
          <h3 style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>{d.home.chartRevExp}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-muted)" }} />
              <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickFormatter={(v) => `R$${v}`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Area type="monotone" dataKey="receitas" stroke="#22C55E" fill="#F0FDF4" strokeWidth={2} name={d.home.income} />
              <Area type="monotone" dataKey="despesas" stroke="#EF4444" fill="#FEF2F2" strokeWidth={2} name={d.home.expenses} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
          <h3 style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>{d.home.chartExpCat}</h3>
          {data.categoryChart.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={data.categoryChart} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {data.categoryChart.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Legend iconSize={10} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>{d.home.noExpenses}</div>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Recent Transactions */}
        <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "0.9rem" }}>{d.home.recentTx}</h3>
            <a href="/dashboard/transactions" style={{ fontSize: "0.75rem", color: "#2563EB", textDecoration: "none" }}>{d.home.viewAll}</a>
          </div>
          {data.recentTransactions.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", textAlign: "center", padding: "1rem" }}>{d.home.noTx}</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {data.recentTransactions.map((tx) => (
                <div key={tx.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: tx.type === "INCOME" ? "#F0FDF4" : "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem" }}>
                      {tx.category?.icon ?? (tx.type === "INCOME" ? "📈" : "📉")}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-heading)" }}>{tx.description ?? tx.category?.name ?? "—"}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{formatDate(tx.date)}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: tx.type === "INCOME" ? "#22C55E" : "#EF4444" }}>
                    {tx.type === "INCOME" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Budgets */}
        <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "0.9rem" }}>{d.home.budgetsTitle}</h3>
            <a href="/dashboard/budgets" style={{ fontSize: "0.75rem", color: "#2563EB", textDecoration: "none" }}>{d.home.manage}</a>
          </div>
          {data.budgets.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", textAlign: "center", padding: "1rem" }}>{d.home.noBudgets}</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {data.budgets.slice(0, 4).map((b) => {
                const pct = Math.min((b.spent / b.amount) * 100, 100);
                const over = b.spent > b.amount;
                return (
                  <div key={b.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-heading)" }}>{b.name}</span>
                      <span style={{ fontSize: "0.75rem", color: over ? "#EF4444" : "var(--text-muted)" }}>{formatCurrency(b.spent)} / {formatCurrency(b.amount)}</span>
                    </div>
                    <div style={{ height: 6, background: "var(--background)", borderRadius: 100 }}>
                      <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: over ? "#EF4444" : pct > 80 ? "#F59E0B" : "#22C55E", transition: "width 0.3s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Goals */}
      {data.goals.length > 0 && (
        <div style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "0.9rem" }}>{d.home.goalsTitle}</h3>
            <a href="/dashboard/goals" style={{ fontSize: "0.75rem", color: "#2563EB", textDecoration: "none" }}>{d.home.viewAll}</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {data.goals.slice(0, 4).map((g) => {
              const pct = Math.min((g.currentAmount / g.targetAmount) * 100, 100);
              return (
                <div key={g.id} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "1rem" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "0.5rem" }}>🎯 {g.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{formatCurrency(g.currentAmount)} / {formatCurrency(g.targetAmount)}</div>
                  <div style={{ height: 6, background: "var(--background)", borderRadius: 100 }}>
                    <div style={{ height: "100%", borderRadius: 100, width: `${pct}%`, background: "#2563EB" }} />
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{pct.toFixed(0)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
