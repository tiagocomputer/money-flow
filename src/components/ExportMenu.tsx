"use client";

import { useState, useRef, useEffect } from "react";
import { exportCSV, exportPDF } from "@/lib/export";

interface ExportMenuProps {
  filename: string;
  pdfTitle: string;
  headers: string[];
  rows: () => string[][];
}

export default function ExportMenu({ filename, pdfTitle, headers, rows }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleExcel() {
    setOpen(false);
    exportCSV(headers, rows(), filename);
  }

  function handlePDF() {
    setOpen(false);
    exportPDF(pdfTitle, headers, rows());
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title="Exportar relatório"
        style={{
          display: "flex", alignItems: "center", gap: "0.375rem",
          padding: "0.625rem 1rem",
          borderRadius: 8, border: "1px solid var(--border)",
          background: "var(--section-white)", color: "var(--text-muted)",
          fontWeight: 600, fontSize: "0.875rem", cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Exportar
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 200,
          background: "var(--section-white)", border: "1px solid var(--border)",
          borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          minWidth: 180, overflow: "hidden",
        }}>
          <button onClick={handleExcel} style={menuItemStyle}>
            <span style={{ fontSize: "1rem" }}>📊</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-heading)" }}>Excel (.csv)</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Abrir no Excel ou Sheets</div>
            </div>
          </button>
          <div style={{ height: 1, background: "var(--border)" }} />
          <button onClick={handlePDF} style={menuItemStyle}>
            <span style={{ fontSize: "1rem" }}>📄</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-heading)" }}>PDF</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Salvar ou imprimir</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

const menuItemStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "0.75rem",
  width: "100%", padding: "0.75rem 1rem",
  background: "none", border: "none", cursor: "pointer",
  textAlign: "left",
};
