"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const GridScan = dynamic(() => import("./GridScan"), { ssr: false });

export default function HeroSection() {
  return (
    <section style={{ position: "relative", color: "white", padding: "6rem 2rem", textAlign: "center", background: "#05091a", overflow: "hidden" }}>
      {/* GridScan background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <GridScan
          linesColor="#1e40af"
          scanColor="#93c5fd"
          scanOpacity={0.7}
          gridScale={0.09}
          lineThickness={1.2}
          scanGlow={1.0}
          scanSoftness={2.5}
          scanDuration={2.5}
          scanDelay={1.0}
          bloomIntensity={0.5}
          noiseIntensity={0.006}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Gradient overlay so text stays readable */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(5,9,26,0.45) 0%, rgba(5,9,26,0.15) 50%, rgba(5,9,26,0.55) 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "0.375rem 1rem", fontSize: "0.875rem", fontWeight: 600, marginBottom: "1.5rem" }}>
          ✨ Gerenciamento de Finanças Inteligente
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          QUER APRENDER A GERENCIAR SEU DINHEINHO DE FORMA INTELIGENTE?
        </h1>
        <p style={{ fontSize: "1.25rem", opacity: 0.85, marginBottom: "2.5rem", fontWeight: 500 }}>
          TENHA CONTROLE SOBRE SEU DINHEINHO
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/register" style={{ background: "white", color: "#1e40af", padding: "0.875rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
            Começar gratuitamente →
          </Link>
          <Link href="#features" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", color: "white", padding: "0.875rem 2rem", borderRadius: 8, fontWeight: 600, fontSize: "1rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
            Ver funcionalidades
          </Link>
        </div>
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "2rem", opacity: 0.8, fontSize: "0.875rem", flexWrap: "wrap" }}>
          <span>✅ 14 dias grátis</span>
          <span>✅ Sem cartão de crédito</span>
          <span>✅ Cancele quando quiser</span>
        </div>
      </div>
    </section>
  );
}
