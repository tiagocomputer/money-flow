"use client";

import { useRef, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import type { Lang } from "../i18n/translations";

const LANGS: { value: Lang; flag: string; short: string; name: string }[] = [
  { value: "pt-BR", flag: "🇧🇷", short: "PT", name: "Português" },
  { value: "en",    flag: "🇺🇸", short: "EN", name: "English"   },
  { value: "fr",    flag: "🇨🇦", short: "FR", name: "Français CA" },
];

interface Props {
  /** "down" (default) for header/top bars, "up" for sidebars/bottom bars */
  dropdownDir?: "down" | "up";
  /** Compact pill layout (for sidebar footers etc.) */
  compact?: boolean;
}

export default function ThemeLangControls({ dropdownDir = "down", compact = false }: Props) {
  const { theme, toggleTheme, lang, setLang } = useAppContext();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";
  const current = LANGS.find((l) => l.value === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const btnSize = compact ? 34 : 38;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? "0.375rem" : "0.5rem" }}>
      {/* ── Theme toggle ── */}
      <button
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Modo claro" : "Modo escuro"}
        style={iconBtnStyle(btnSize, isDark)}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* ── Language picker ── */}
      <div style={{ position: "relative" }} ref={langRef}>
        <button
          onClick={() => setLangOpen((v) => !v)}
          aria-label="Selecionar idioma"
          aria-expanded={langOpen}
          style={{
            ...iconBtnStyle(btnSize, isDark),
            width: "auto",
            minWidth: btnSize,
            padding: "0 10px",
            borderRadius: 50,
            gap: 5,
          }}
        >
          <GlobeIcon size={compact ? 14 : 16} />
          <span style={{ fontSize: compact ? "0.65rem" : "0.7rem", fontWeight: 700, letterSpacing: "0.04em" }}>
            {current.short}
          </span>
        </button>

        {langOpen && (
          <div
            style={{
              position: "absolute",
              [dropdownDir === "up" ? "bottom" : "top"]: "calc(100% + 8px)",
              right: 0,
              background: "var(--section-white, #fff)",
              border: "1px solid var(--border, #E2E8F0)",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              overflow: "hidden",
              minWidth: 150,
              zIndex: 200,
              animation: "tlc-drop 0.14s ease",
            }}
          >
            {LANGS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setLang(opt.value); setLangOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  background: lang === opt.value ? "#EFF6FF" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: lang === opt.value ? 700 : 500,
                  color: lang === opt.value ? "#2563EB" : "var(--foreground, #0F172A)",
                  transition: "background 0.12s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (lang !== opt.value) (e.currentTarget as HTMLButtonElement).style.background = "var(--background, #F8FAFC)";
                }}
                onMouseLeave={(e) => {
                  if (lang !== opt.value) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{opt.flag}</span>
                <span>{opt.name}</span>
                {lang === opt.value && (
                  <span style={{ marginLeft: "auto", color: "#2563EB" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes tlc-drop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function iconBtnStyle(size: number, isDark: boolean): React.CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: "50%",
    border: `1px solid var(--border, ${isDark ? "#334155" : "#E2E8F0"})`,
    background: "var(--section-white, white)",
    color: "var(--foreground, #0F172A)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
    flexShrink: 0,
    outline: "none",
  };
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  );
}

function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
