"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import type { Lang } from "../i18n/translations";

const LANG_OPTIONS: { value: Lang; flag: string; label: string }[] = [
  { value: "pt-BR", flag: "🇧🇷", label: "PT-BR" },
  { value: "en",    flag: "🇺🇸", label: "EN" },
  { value: "fr",    flag: "🇫🇷", label: "FR" },
];

export default function Header() {
  const { theme, toggleTheme, lang, setLang, t } = useAppContext();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close drawer on resize to desktop
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

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const close = () => setOpen(false);
  const isDark = theme === "dark";
  const currentLang = LANG_OPTIONS.find((o) => o.value === lang)!;

  return (
    <>
      <header style={{
        background: "var(--section-white)",
        borderBottom: "1px solid var(--border)",
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
          {/* Left side: hamburger (mobile) + logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Hamburger button — mobile only, top-left */}
            <button
              className="hdr-hamburger"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <span style={{ fontSize: "1.5rem" }}>💰</span>
              <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#2563EB" }}>MoneyFlow</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hdr-desktop-nav">
            <Link href="#features" style={navLinkStyle}>{t.nav.features}</Link>
            <Link href="#pricing" style={navLinkStyle}>{t.nav.pricing}</Link>
            <Link href="/login" style={btnOutlineStyle}>{t.nav.login}</Link>
            <Link href="/register" style={btnSolidStyle}>{t.nav.register}</Link>

            {/* ── Theme toggle ── */}
            <button
              className="hdr-icon-btn"
              onClick={toggleTheme}
              aria-label={isDark ? "Modo claro" : "Modo escuro"}
              title={isDark ? "Modo claro" : "Modo escuro"}
            >
              {isDark ? (
                /* Sun icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                /* Moon icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* ── Language picker ── */}
            <div style={{ position: "relative" }} ref={langRef}>
              <button
                className="hdr-icon-btn hdr-lang-btn"
                onClick={() => setLangOpen((v) => !v)}
                aria-label="Idioma"
                aria-expanded={langOpen}
              >
                <span style={{ fontSize: "1rem" }}>{currentLang.flag}</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, lineHeight: 1 }}>{currentLang.label}</span>
              </button>

              {langOpen && (
                <div className="hdr-lang-dropdown">
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      className={`hdr-lang-option${lang === opt.value ? " hdr-lang-active" : ""}`}
                      onClick={() => { setLang(opt.value); setLangOpen(false); }}
                    >
                      <span>{opt.flag}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
          <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "1.5rem" }}>💰</span>
            <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#2563EB" }}>MoneyFlow</span>
          </Link>
          <button onClick={close} className="hdr-close" aria-label={t.nav.closeMenu}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <Link href="#features" onClick={close} style={drawerLinkStyle}>{t.nav.features}</Link>
          <Link href="#pricing" onClick={close} style={drawerLinkStyle}>{t.nav.pricing}</Link>
        </nav>

        {/* Drawer CTAs */}
        <div style={{ padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link href="/login" onClick={close} style={{ ...btnOutlineStyle, textAlign: "center", display: "block" }}>{t.nav.login}</Link>
          <Link href="/register" onClick={close} style={{ ...btnSolidStyle, textAlign: "center", display: "block" }}>{t.nav.register}</Link>
        </div>

        {/* Drawer utility buttons */}
        <div style={{ display: "flex", gap: "0.75rem", padding: "1.5rem", marginTop: "auto" }}>
          {/* Theme toggle */}
          <button
            className="hdr-icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Modo claro" : "Modo escuro"}
            style={{ flex: 1, borderRadius: 10, height: 44 }}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Language buttons in drawer */}
          {LANG_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`hdr-icon-btn${lang === opt.value ? " hdr-icon-btn--active" : ""}`}
              onClick={() => setLang(opt.value)}
              style={{ flex: 1, borderRadius: 10, height: 44, flexDirection: "column", gap: 2 }}
            >
              <span style={{ fontSize: "1rem" }}>{opt.flag}</span>
              <span style={{ fontSize: "0.6rem", fontWeight: 700 }}>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Desktop nav: visible above 768px ── */
        .hdr-desktop-nav {
          display: flex;
          gap: 0.5rem;
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

        /* ── Round icon button (theme + lang) ── */
        .hdr-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border, #E2E8F0);
          background: var(--section-white, white);
          color: var(--foreground, #0F172A);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
          flex-shrink: 0;
        }
        .hdr-icon-btn:hover {
          background: var(--background, #F8FAFC);
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .hdr-icon-btn--active {
          border-color: #2563EB;
          background: #EFF6FF !important;
        }

        /* ── Lang button: slightly wider for flag+label ── */
        .hdr-lang-btn {
          width: auto;
          min-width: 38px;
          padding: 0 10px;
          border-radius: 50px;
          gap: 4px;
          flex-direction: row;
        }

        /* ── Lang dropdown ── */
        .hdr-lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--section-white, white);
          border: 1px solid var(--border, #E2E8F0);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          overflow: hidden;
          min-width: 110px;
          z-index: 100;
          animation: hdr-dropdown-in 0.15s ease;
        }
        @keyframes hdr-dropdown-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hdr-lang-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.625rem 0.875rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground, #0F172A);
          transition: background 0.12s;
          text-align: left;
        }
        .hdr-lang-option:hover { background: var(--background, #F8FAFC); }
        .hdr-lang-active { color: #2563EB; font-weight: 700; background: #EFF6FF !important; }

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
          left: 0;
          bottom: 0;
          width: min(320px, 85vw);
          background: var(--section-white, white);
          box-shadow: 4px 0 24px rgba(0,0,0,0.1);
          z-index: 70;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          padding-bottom: 0;
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
          flex-shrink: 0;
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
  color: "var(--text-muted, #64748B)",
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
  color: "var(--foreground, #374151)",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: 500,
  padding: "0.75rem 0.5rem",
  borderRadius: 8,
  display: "block",
};
