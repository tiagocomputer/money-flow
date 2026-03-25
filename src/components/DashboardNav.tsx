"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ThemeLangControls from "@/app/components/ThemeLangControls";
import { useAppContext } from "@/app/context/AppContext";

interface Props {
  user: { name: string; email: string; plan: string };
}

export default function DashboardNav({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, t } = useAppContext();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/dashboard",              icon: "🏠", label: t.dashboard.nav.dashboard    },
    { href: "/dashboard/transactions", icon: "💳", label: t.dashboard.nav.transactions },
    { href: "/dashboard/budgets",      icon: "🧾", label: t.dashboard.nav.budgets      },
    { href: "/dashboard/goals",        icon: "🎯", label: t.dashboard.nav.goals        },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  function close() { setOpen(false); }

  const sidebarBg  = isDark ? "var(--section-white, #1E293B)" : "white";
  const borderCol  = "var(--border, #E2E8F0)";
  const activeText = "#2563EB";
  const activeBg   = isDark ? "rgba(37,99,235,0.15)" : "#EFF6FF";
  const mutedText  = isDark ? "#94A3B8" : "#475569";
  const headingCol = isDark ? "#F1F5F9" : "#0F172A";

  return (
    <>
      {/* Hamburger – mobile only */}
      <button
        className="hamburger-btn"
        style={open ? { display: "none" } : undefined}
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <span /><span /><span />
      </button>

      {/* Backdrop */}
      <div className={`dashboard-overlay${open ? " sidebar-open" : ""}`} onClick={close} />

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar${open ? " sidebar-open" : ""}`}
        style={{ background: sidebarBg, borderColor: borderCol }}
      >
        {/* Logo row */}
        <div style={{ padding: "1.25rem 1rem", borderBottom: `1px solid ${borderCol}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "1.25rem" }}>💰</span>
            <span style={{ fontWeight: 800, color: "#2563EB", fontSize: "1rem", letterSpacing: "-0.01em" }}>MoneyFlow</span>
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Fechar menu"
            className="sidebar-close-btn"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke={mutedText} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "0.75rem 0.625rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
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
                  gap: "0.625rem",
                  padding: "0.5625rem 0.75rem",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: active ? 600 : 400,
                  fontSize: "0.875rem",
                  background: active ? activeBg : "transparent",
                  color: active ? activeText : mutedText,
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                {item.label}
                {active && (
                  <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: activeText }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme + lang controls */}
        <div style={{ padding: "0.75rem 1rem", borderTop: `1px solid ${borderCol}`, display: "flex", justifyContent: "center" }}>
          <ThemeLangControls dropdownDir="up" compact />
        </div>

        {/* Showcase link */}
        <div style={{ padding: "0.5rem 1rem", borderTop: `1px solid ${borderCol}` }}>
          <Link
            href="/showcase"
            onClick={close}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4375rem 0.625rem", borderRadius: 8,
              textDecoration: "none", fontSize: "0.75rem",
              color: isDark ? "#64748B" : "#94A3B8", fontWeight: 500,
              transition: "background 0.15s",
            }}
          >
            <span>🎨</span> Component Showcase
          </Link>
        </div>

        {/* User section */}
        <div style={{ padding: "0.75rem 1rem", borderTop: `1px solid ${borderCol}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
            {/* Avatar */}
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "0.8125rem", color: headingCol, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
              <div style={{ fontSize: "0.6875rem", color: mutedText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
            </div>
            <div style={{ display: "inline-flex", padding: "0.125rem 0.5rem", borderRadius: 100, fontSize: "0.625rem", fontWeight: 700, background: user.plan === "PRO" ? "#2563EB" : user.plan === "TRIAL" ? "#0EA5E9" : isDark ? "#334155" : "#E2E8F0", color: user.plan === "FREE" ? (isDark ? "#94A3B8" : "#64748B") : "white", flexShrink: 0 }}>
              {user.plan}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ width: "100%", padding: "0.4375rem", background: isDark ? "rgba(220,38,38,0.12)" : "#FEF2F2", color: "#DC2626", border: `1px solid ${isDark ? "rgba(220,38,38,0.25)" : "#FECACA"}`, borderRadius: 8, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "background 0.15s" }}
          >
            {t.dashboard.nav.logout}
          </button>
        </div>
      </aside>
    </>
  );
}
