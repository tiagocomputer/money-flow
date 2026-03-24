"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/dashboard/transactions", icon: "💳", label: "Transações" },
  { href: "/dashboard/budgets", icon: "🧾", label: "Orçamentos" },
  { href: "/dashboard/goals", icon: "🎯", label: "Metas" },
];

interface Props {
  user: { name: string; email: string; plan: string };
}

export default function DashboardNav({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  function close() {
    setOpen(false);
  }

  return (
    <>
      {/* Hamburger button – only visible on mobile via CSS */}
      <button
        className="hamburger-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Backdrop overlay */}
      <div
        className={`dashboard-overlay${open ? " sidebar-open" : ""}`}
        onClick={close}
      />

      {/* Sidebar */}
      <aside className={`dashboard-sidebar${open ? " sidebar-open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>💰</span>
            <span style={{ fontWeight: 800, color: "#2563EB", fontSize: "1rem" }}>MoneyFlow</span>
          </div>
          {/* Close button inside sidebar (mobile) */}
          <button
            onClick={close}
            aria-label="Fechar menu"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "#94A3B8", lineHeight: 1, padding: "0.25rem", display: "flex", alignItems: "center" }}
            className="sidebar-close-btn"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: active ? 600 : 400,
                  fontSize: "0.875rem",
                  background: active ? "#EFF6FF" : "transparent",
                  color: active ? "#2563EB" : "#475569",
                  transition: "all 0.15s",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "1rem", borderTop: "1px solid #E2E8F0" }}>
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
            <div style={{ display: "inline-block", marginTop: "0.25rem", padding: "0.125rem 0.5rem", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, background: user.plan === "PRO" ? "#2563EB" : user.plan === "TRIAL" ? "#0EA5E9" : "#E2E8F0", color: user.plan === "FREE" ? "#64748B" : "white" }}>
              {user.plan}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ width: "100%", padding: "0.5rem", background: "#FEF2F2", color: "#DC2626", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
          >
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
