"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import ThemeLangControls from "./ThemeLangControls";

export default function Header() {
  const { t } = useAppContext();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header style={{
        background: "var(--section-white)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "box-shadow 0.2s",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0.875rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}>
          {/* Left: hamburger + logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              className="hdr-hamburger"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>

            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <span style={{ fontSize: "1.375rem" }}>💰</span>
              <span style={{ fontWeight: 800, fontSize: "1.0625rem", color: "#2563EB", letterSpacing: "-0.01em" }}>MoneyFlow</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hdr-desktop-nav">
            <Link href="#features" style={navLinkStyle}>{t.nav.features}</Link>
            <Link href="#pricing" style={navLinkStyle}>{t.nav.pricing}</Link>

            <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 0.25rem" }} />

            <Link href="/login" style={btnOutlineStyle}>{t.nav.login}</Link>
            <Link href="/register" style={btnSolidStyle}>{t.nav.register}</Link>

            <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 0.25rem" }} />

            <ThemeLangControls />
          </nav>
        </div>
      </header>

      {/* Mobile overlay backdrop */}
      {open && <div className="hdr-backdrop" onClick={close} aria-hidden="true" />}

      {/* Mobile drawer */}
      <div className={`hdr-drawer${open ? " hdr-drawer-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
          <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "1.25rem" }}>💰</span>
            <span style={{ fontWeight: 800, fontSize: "1rem", color: "#2563EB" }}>MoneyFlow</span>
          </Link>
          <button onClick={close} className="hdr-close" aria-label={t.nav.closeMenu}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.125rem", flex: 1 }}>
          <Link href="#features" onClick={close} style={drawerLinkStyle}>{t.nav.features}</Link>
          <Link href="#pricing" onClick={close} style={drawerLinkStyle}>{t.nav.pricing}</Link>

          <div style={{ height: 1, background: "var(--border)", margin: "0.75rem 0" }} />

          <Link href="/login" onClick={close} style={{ ...btnOutlineStyle, textAlign: "center", display: "block" }}>{t.nav.login}</Link>
          <div style={{ marginTop: "0.5rem" }}>
            <Link href="/register" onClick={close} style={{ ...btnSolidStyle, textAlign: "center", display: "block" }}>{t.nav.register}</Link>
          </div>
        </nav>

        {/* Drawer footer: theme + lang */}
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "center" }}>
          <ThemeLangControls dropdownDir="up" />
        </div>
      </div>

      <style>{`
        .hdr-desktop-nav {
          display: flex;
          gap: 0.375rem;
          align-items: center;
        }

        .hdr-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }
        .hdr-hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--foreground, #0F172A);
          border-radius: 2px;
          transition: background 0.15s;
        }
        .hdr-hamburger:hover span { background: #2563EB; }

        .hdr-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          z-index: 60;
          backdrop-filter: blur(3px);
          animation: hdr-fade-in 0.2s ease;
        }

        .hdr-drawer {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: min(300px, 85vw);
          background: var(--section-white, white);
          box-shadow: 4px 0 32px rgba(0,0,0,0.12);
          z-index: 70;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }
        .hdr-drawer-open { transform: translateX(0); }

        .hdr-close {
          background: var(--background, #F8FAFC);
          border: 1px solid var(--border, #E2E8F0);
          border-radius: 8px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .hdr-close:hover { background: var(--border, #E2E8F0); }

        @keyframes hdr-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (max-width: 768px) {
          .hdr-desktop-nav { display: none; }
          .hdr-hamburger   { display: flex; }
        }
      `}</style>
    </>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: "var(--text-muted, #64748B)",
  textDecoration: "none",
  fontSize: "0.875rem",
  fontWeight: 500,
  padding: "0.375rem 0.5rem",
  borderRadius: 6,
  transition: "color 0.15s",
};

const btnOutlineStyle: React.CSSProperties = {
  color: "#2563EB",
  border: "1px solid #2563EB",
  padding: "0.4375rem 0.875rem",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
};

const btnSolidStyle: React.CSSProperties = {
  background: "#2563EB",
  color: "white",
  padding: "0.4375rem 0.875rem",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
};

const drawerLinkStyle: React.CSSProperties = {
  color: "var(--foreground, #374151)",
  textDecoration: "none",
  fontSize: "0.9375rem",
  fontWeight: 500,
  padding: "0.6875rem 0.75rem",
  borderRadius: 8,
  display: "block",
  transition: "background 0.15s",
};
