"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header style={{
        background: "white",
        borderBottom: "1px solid #E2E8F0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "1.5rem" }}>💰</span>
            <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#2563EB" }}>MoneyFlow</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hdr-desktop-nav">
            <Link href="#features" style={navLinkStyle}>Funcionalidades</Link>
            <Link href="#pricing" style={navLinkStyle}>Preços</Link>
            <Link href="/login" style={btnOutlineStyle}>Entrar</Link>
            <Link href="/register" style={btnSolidStyle}>Começar grátis</Link>
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            className="hdr-hamburger"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="hdr-backdrop"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div className={`hdr-drawer${open ? " hdr-drawer-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid #E2E8F0" }}>
          <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "1.5rem" }}>💰</span>
            <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#2563EB" }}>MoneyFlow</span>
          </Link>
          <button
            onClick={close}
            className="hdr-close"
            aria-label="Fechar menu"
          >
            {/* X icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <Link href="#features" onClick={close} style={drawerLinkStyle}>Funcionalidades</Link>
          <Link href="#pricing" onClick={close} style={drawerLinkStyle}>Preços</Link>
        </nav>

        {/* Drawer CTAs */}
        <div style={{ padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link href="/login" onClick={close} style={{ ...btnOutlineStyle, textAlign: "center", display: "block" }}>Entrar</Link>
          <Link href="/register" onClick={close} style={{ ...btnSolidStyle, textAlign: "center", display: "block" }}>Começar grátis</Link>
        </div>
      </div>

      <style>{`
        /* ── Desktop nav: visible above 768px ── */
        .hdr-desktop-nav {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        /* ── Hamburger: hidden on desktop ── */
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
          width: 22px;
          height: 2px;
          background: #0F172A;
          border-radius: 2px;
          transition: background 0.15s;
        }
        .hdr-hamburger:hover span { background: #2563EB; }

        /* ── Backdrop ── */
        .hdr-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.35);
          z-index: 60;
          backdrop-filter: blur(2px);
          animation: hdr-fade-in 0.2s ease;
        }

        /* ── Drawer ── */
        .hdr-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(320px, 85vw);
          background: white;
          box-shadow: -4px 0 24px rgba(0,0,0,0.1);
          z-index: 70;
          transform: translateX(100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          padding-bottom: 2rem;
        }
        .hdr-drawer-open {
          transform: translateX(0);
        }

        /* ── Close button ── */
        .hdr-close {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }
        .hdr-close:hover { background: #F1F5F9; }

        @keyframes hdr-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Mobile breakpoint ── */
        @media (max-width: 768px) {
          .hdr-desktop-nav { display: none; }
          .hdr-hamburger   { display: flex; }
        }
      `}</style>
    </>
  );
}

/* Shared style tokens */
const navLinkStyle: React.CSSProperties = {
  color: "#64748B",
  textDecoration: "none",
  fontSize: "0.875rem",
};

const btnOutlineStyle: React.CSSProperties = {
  color: "#2563EB",
  border: "1px solid #2563EB",
  padding: "0.5rem 1rem",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.875rem",
};

const btnSolidStyle: React.CSSProperties = {
  background: "#2563EB",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.875rem",
};

const drawerLinkStyle: React.CSSProperties = {
  color: "#374151",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: 500,
  padding: "0.75rem 0.5rem",
  borderRadius: 8,
  display: "block",
};
