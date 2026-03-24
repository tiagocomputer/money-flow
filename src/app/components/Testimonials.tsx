"use client";

import { useRef, MouseEvent } from "react";

const testimonials = [
  {
    name: "Ana Paula Ferreira",
    role: "Empreendedora",
    company: "Studio AP",
    avatar: "AP",
    color: "#2563EB",
    rating: 5,
    text: "O MoneyFlow transformou como gerencio as finanças do meu negócio. Antes eu perdia horas em planilhas, agora tenho tudo em tempo real.",
  },
  {
    name: "Carlos Eduardo Lima",
    role: "Desenvolvedor Freelancer",
    company: "Autônomo",
    avatar: "CE",
    color: "#0EA5E9",
    rating: 5,
    text: "Finalmente consigo separar minhas finanças pessoais das profissionais. Os relatórios são incríveis e me ajudam a planejar os próximos meses.",
  },
  {
    name: "Mariana Costa",
    role: "Diretora Financeira",
    company: "TechStart BR",
    avatar: "MC",
    color: "#6366F1",
    rating: 5,
    text: "Implementamos o MoneyFlow em toda a empresa. A visibilidade dos fluxos de caixa melhorou muito a nossa tomada de decisão estratégica.",
  },
  {
    name: "Rafael Souza",
    role: "Designer",
    company: "Agência Pixel",
    avatar: "RS",
    color: "#EC4899",
    rating: 5,
    text: "Interface linda e super intuitiva. Em menos de 10 minutos já estava usando de verdade. Recomendo para qualquer profissional criativo.",
  },
  {
    name: "Juliana Mendes",
    role: "Médica",
    company: "Clínica JM",
    avatar: "JM",
    color: "#22C55E",
    rating: 5,
    text: "Minha clínica cresceu muito com o controle financeiro que o MoneyFlow oferece. Tenho clareza sobre cada centavo que entra e sai.",
  },
  {
    name: "Pedro Alves",
    role: "CEO",
    company: "Construções PA",
    avatar: "PA",
    color: "#F59E0B",
    rating: 5,
    text: "Nunca pensei que um software de finanças pudesse ser tão fácil de usar. Minha equipe adorou, e os resultados foram imediatos.",
  },
  {
    name: "Fernanda Rocha",
    role: "Consultora",
    company: "FR Soluções",
    avatar: "FR",
    color: "#8B5CF6",
    rating: 5,
    text: "Os alertas de orçamento são fantásticos. Evitei várias surpresas desagradáveis graças aos avisos automáticos do sistema.",
  },
  {
    name: "Bruno Oliveira",
    role: "Arquiteto",
    company: "Studio BO",
    avatar: "BO",
    color: "#0F172A",
    rating: 5,
    text: "A função de metas financeiras me motivou a poupar de verdade. Já atingi dois objetivos que estavam parados há anos nas minhas resoluções.",
  },
  {
    name: "Larissa Nunes",
    role: "Professora",
    company: "Escola Saber",
    avatar: "LN",
    color: "#EF4444",
    rating: 5,
    text: "Simples, bonito e eficiente. Uso tanto no celular quanto no computador e a experiência é sempre excelente em qualquer tela.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: "0.75rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#F59E0B", fontSize: "0.875rem" }}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "white",
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: "1.5rem",
        marginBottom: "1rem",
        cursor: "default",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        transformStyle: "preserve-3d",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        willChange: "transform",
      }}
    >
      <StarRating count={t.rating} />
      <p style={{ color: "#334155", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: t.color, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0F172A" }}>{t.name}</div>
          <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

function ScrollColumn({ items, direction }: { items: typeof testimonials; direction: "up" | "down" }) {
  const doubled = [...items, ...items];
  const animName = direction === "up" ? "scrollUp" : "scrollDown";

  return (
    <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
      <div
        style={{
          animation: `${animName} ${items.length * 6}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const col1 = testimonials.slice(0, 3);
  const col2 = testimonials.slice(3, 6);
  const col3 = testimonials.slice(6, 9);

  return (
    <section style={{ padding: "5rem 2rem", background: "#0F172A", overflow: "hidden" }}>
      <style>{`
        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "inline-block", background: "rgba(37,99,235,0.15)", color: "#60A5FA", fontSize: "0.8rem", fontWeight: 700, padding: "0.375rem 1rem", borderRadius: 100, marginBottom: "1rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Depoimentos
          </div>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "white", marginBottom: "1rem", lineHeight: 1.2 }}>
            O que nossos clientes dizem
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "1.125rem", maxWidth: 520, margin: "0 auto" }}>
            Mais de 10.000 profissionais e empresas confiam no MoneyFlow para controlar suas finanças.
          </p>
        </div>

        {/* Columns */}
        <div
          style={{ display: "flex", gap: "1rem", height: 480, alignItems: "flex-start" }}
        >
          <ScrollColumn items={col1} direction="up" />
          <ScrollColumn items={col2} direction="down" />
          <ScrollColumn items={col3} direction="up" />
        </div>

        {/* Fade edges */}
        <div style={{ position: "relative", marginTop: "-480px", height: 480, pointerEvents: "none", zIndex: 2 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #0F172A, transparent)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #0F172A, transparent)" }} />
        </div>
      </div>
    </section>
  );
}
