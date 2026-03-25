"use client";

import Link from "next/link";
import PricingCards from "./components/PricingCards";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import Header from "./components/Header";
import { useAppContext } from "./context/AppContext";

export default function LandingPage() {
  const { t } = useAppContext();

  return (
    <div style={{ background: "var(--section-bg)", minHeight: "100vh" }}>
      <Header />
      <HeroSection />

      {/* Stats */}
      <section style={{ background: "var(--section-white)", padding: "3rem 2rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {t.stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#2563EB" }}>{s.num}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "5rem 2rem", background: "var(--section-bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>
              {t.features.title}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.125rem", maxWidth: 600, margin: "0 auto" }}>
              {t.features.subtitle}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {t.features.items.map((f) => (
              <div key={f.title} style={{ background: "var(--section-white)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.75rem" }}>
                <div style={{ width: 48, height: 48, background: `${f.color}22`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Pricing */}
      <section id="pricing" style={{ padding: "5rem 2rem", background: "var(--section-white)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>
              {t.pricing.title}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.125rem" }}>{t.pricing.subtitle}</p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)", color: "white", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "1rem", color: "white" }}>{t.cta.title}</h2>
          <p style={{ opacity: 0.9, marginBottom: "2rem", fontSize: "1.125rem", color: "white" }}>{t.cta.subtitle}</p>
          <Link href="/register" style={{ display: "inline-block", background: "white", color: "#2563EB", padding: "0.875rem 2.5rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
            {t.cta.btn}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0F172A", color: "#94A3B8", padding: "2rem", textAlign: "center", fontSize: "0.875rem" }}>
        <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          <span>💰</span>
          <span style={{ color: "white", fontWeight: 700 }}>MoneyFlow</span>
        </div>
        <p>{t.footer.copy}</p>
      </footer>
    </div>
  );
}
