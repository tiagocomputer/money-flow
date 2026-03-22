"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "FREE",
    price: "R$ 0",
    period: "/mês",
    description: "Para começar",
    features: ["1 conta bancária", "20 transações/mês", "Dashboard básico", "Categorias padrão"],
    cta: "Começar grátis",
    href: "/register",
    highlighted: false,
  },
  {
    name: "TRIAL",
    price: "14 dias",
    period: "grátis",
    description: "Experimente tudo",
    features: ["Tudo ilimitado", "Dashboard completo", "Relatórios automáticos", "Suporte prioritário"],
    cta: "Iniciar trial",
    href: "/register?plan=trial",
    highlighted: false,
  },
  {
    name: "PRO",
    price: "R$ 97",
    period: "/mês",
    description: "Para quem é sério",
    features: [
      "Contas ilimitadas",
      "Transações ilimitadas",
      "KPIs avançados",
      "Automações",
      "Relatórios completos",
      "Suporte prioritário",
    ],
    cta: "Assinar PRO",
    href: "/register?plan=pro",
    highlighted: true,
  },
];

export default function PricingCards() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {plans.map((plan) => {
        const isSelected = selected === plan.name;
        const isHovered = hovered === plan.name;

        const borderColor = isSelected
          ? "#1D4ED8"
          : isHovered
          ? "#2563EB"
          : plan.highlighted
          ? "#2563EB"
          : "#E2E8F0";

        const borderWidth = isSelected || plan.highlighted ? 2 : isHovered ? 2 : 1;

        const bgColor = isSelected
          ? "#DBEAFE"
          : plan.highlighted
          ? "#EFF6FF"
          : isHovered
          ? "#F8FAFC"
          : "white";

        const shadow = isSelected
          ? "0 8px 30px rgba(37, 99, 235, 0.25)"
          : isHovered
          ? "0 8px 24px rgba(37, 99, 235, 0.12)"
          : "none";

        const scale = isSelected ? "scale(1.03)" : isHovered ? "scale(1.015)" : "scale(1)";

        return (
          <div
            key={plan.name}
            onClick={() => setSelected(isSelected ? null : plan.name)}
            onMouseEnter={() => setHovered(plan.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              border: `${borderWidth}px solid ${borderColor}`,
              borderRadius: 16,
              padding: "2rem",
              position: "relative",
              background: bgColor,
              cursor: "pointer",
              transform: scale,
              boxShadow: shadow,
              transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease",
              userSelect: "none",
            }}
          >
            {plan.highlighted && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#2563EB",
                  color: "white",
                  padding: "0.25rem 0.875rem",
                  borderRadius: 100,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                MAIS POPULAR
              </div>
            )}

            {isSelected && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
            )}

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#64748B", marginBottom: "0.5rem" }}>
                {plan.name}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0F172A" }}>{plan.price}</span>
                <span style={{ color: "#64748B" }}>{plan.period}</span>
              </div>
              <div style={{ color: "#64748B", fontSize: "0.875rem" }}>{plan.description}</div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
              {plan.features.map((f) => (
                <li
                  key={f}
                  style={{
                    padding: "0.375rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ color: "#22C55E", fontWeight: 700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "block",
                textAlign: "center",
                padding: "0.75rem",
                borderRadius: 8,
                fontWeight: 700,
                textDecoration: "none",
                background: plan.highlighted ? "#2563EB" : "transparent",
                color: plan.highlighted ? "white" : "#2563EB",
                border: plan.highlighted ? "none" : "1px solid #2563EB",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {plan.cta}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
