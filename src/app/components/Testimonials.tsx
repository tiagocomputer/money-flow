"use client";

import { useRef, useState, MouseEvent } from "react";
import { ChevronDown, ChevronUp, BadgeCheck } from "lucide-react";

interface Testimonial {
  text: string;
  author: {
    name: string;
    role: string;
    company: string;
    initials: string;
    color: string;
    verified?: boolean;
  };
}

const testimonials: Testimonial[] = [
  {
    text: "O MoneyFlow transformou como gerencio as finanças do meu negócio. Antes perdia horas em planilhas, agora tenho tudo em tempo real e consigo tomar decisões muito mais rápido.",
    author: { name: "Ana Paula Ferreira", role: "Empreendedora", company: "Studio AP", initials: "AP", color: "#2563EB", verified: true },
  },
  {
    text: "Finalmente consegui separar minhas finanças pessoais das profissionais. Os relatórios são incríveis e me ajudam a planejar os próximos meses com muita clareza.",
    author: { name: "Carlos Eduardo Lima", role: "Desenvolvedor Freelancer", company: "Autônomo", initials: "CE", color: "#0EA5E9", verified: true },
  },
  {
    text: "Implementamos o MoneyFlow em toda a empresa. A visibilidade dos fluxos de caixa melhorou muito a nossa tomada de decisão estratégica. Recomendo para qualquer gestor.",
    author: { name: "Mariana Costa", role: "Diretora Financeira", company: "TechStart BR", initials: "MC", color: "#6366F1", verified: true },
  },
  {
    text: "Interface linda e super intuitiva. Em menos de 10 minutos já estava usando de verdade. Recomendo para qualquer profissional criativo que quer organizar as contas.",
    author: { name: "Rafael Souza", role: "Designer UI/UX", company: "Agência Pixel", initials: "RS", color: "#EC4899", verified: false },
  },
  {
    text: "Minha clínica cresceu muito com o controle financeiro que o MoneyFlow oferece. Tenho clareza sobre cada centavo que entra e sai. Uma ferramenta essencial.",
    author: { name: "Juliana Mendes", role: "Médica", company: "Clínica JM", initials: "JM", color: "#22C55E", verified: true },
  },
  {
    text: "Nunca pensei que um software de finanças pudesse ser tão fácil de usar. Minha equipe adorou, e os resultados foram imediatos. O suporte também é excelente.",
    author: { name: "Pedro Alves", role: "CEO", company: "Construções PA", initials: "PA", color: "#F59E0B", verified: false },
  },
  {
    text: "Os alertas de orçamento são fantásticos. Evitei várias surpresas desagradáveis graças aos avisos automáticos do sistema. Vale muito cada centavo da assinatura.",
    author: { name: "Fernanda Rocha", role: "Consultora de Negócios", company: "FR Soluções", initials: "FR", color: "#8B5CF6", verified: true },
  },
  {
    text: "A função de metas financeiras me motivou a poupar de verdade. Já atingi dois objetivos que estavam parados há anos nas minhas resoluções de ano novo!",
    author: { name: "Bruno Oliveira", role: "Arquiteto", company: "Studio BO", initials: "BO", color: "#0F172A", verified: false },
  },
  {
    text: "Simples, bonito e eficiente. Uso tanto no celular quanto no computador e a experiência é sempre excelente. Um dos melhores investimentos que fiz para o meu negócio.",
    author: { name: "Larissa Nunes", role: "Professora", company: "Escola Saber", initials: "LN", color: "#EF4444", verified: true },
  },
  {
    text: "Gerencio os projetos dos clientes e as finanças pessoais no mesmo lugar. O dashboard me dá uma visão clara do meu fluxo de caixa mensal sem precisar de planilhas.",
    author: { name: "Diego Carvalho", role: "Engenheiro Civil", company: "DC Projetos", initials: "DC", color: "#059669", verified: false },
  },
  {
    text: "Depois de testar vários apps financeiros, o MoneyFlow foi o único que realmente ficou no meu dia a dia. A curva de aprendizado é zero — já na primeira hora você domina tudo.",
    author: { name: "Isabela Martins", role: "Advogada", company: "Martins & Associados", initials: "IM", color: "#D97706", verified: true },
  },
  {
    text: "Começamos a usar para controle da loja e em 3 meses já identificamos onde estávamos perdendo dinheiro. O ROI foi imediato. Ferramenta imprescindível para PMEs.",
    author: { name: "Roberto Santos", role: "Comerciante", company: "Loja RS", initials: "RS", color: "#7C3AED", verified: false },
  },
];

const INITIAL_COUNT = 8;

function TestimonialCard({ t }: { t: Testimonial }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    el.style.boxShadow = `0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    el.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: "white",
        border: "1px solid #E2E8F0",
        borderRadius: 14,
        padding: "1.25rem",
        marginBottom: "0.75rem",
        breakInside: "avoid",
        display: "inline-block",
        width: "100%",
        cursor: "default",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transformStyle: "preserve-3d",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        willChange: "transform",
      }}
    >
      <p style={{ color: "#334155", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1rem" }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: t.author.color, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
          border: "2px solid #F1F5F9",
        }}>
          {t.author.initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.8rem", color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {t.author.name}
            </span>
            {t.author.verified && (
              <BadgeCheck size={13} style={{ color: "#2563EB", flexShrink: 0 }} />
            )}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#94A3B8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {t.author.role} · {t.author.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, INITIAL_COUNT);

  return (
    <section style={{ padding: "5rem 2rem", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", background: "#EFF6FF", color: "#2563EB", fontSize: "0.75rem", fontWeight: 700, padding: "0.3rem 0.875rem", borderRadius: 100, marginBottom: "0.875rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Depoimentos
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.75rem", lineHeight: 1.25 }}>
            O que nossos clientes dizem
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Mais de 10.000 profissionais e empresas confiam no MoneyFlow para controlar suas finanças.
          </p>
        </div>

        {/* Masonry grid */}
        <div style={{ position: "relative" }}>
          <div style={{
            columns: "1",
            columnGap: "0.75rem",
          }}
            className="testimonials-grid"
          >
            {visible.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>

          {/* Fade when collapsed */}
          {!showAll && (
            <div style={{
              position: "absolute", inset: "auto 0 0 0", height: 120,
              background: "linear-gradient(to top, #F8FAFC 30%, transparent)",
              pointerEvents: "none",
            }} />
          )}
        </div>

        {/* Show more / less */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <button
            onClick={() => setShowAll(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 1.75rem",
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              background: "white",
              color: "#374151",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.15s",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {showAll ? "Ver menos" : "Ver todos os depoimentos"}
            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Responsive columns via style tag */}
      <style>{`
        .testimonials-grid { columns: 1; }
        @media (min-width: 640px)  { .testimonials-grid { columns: 2; } }
        @media (min-width: 1024px) { .testimonials-grid { columns: 3; } }
        @media (min-width: 1280px) { .testimonials-grid { columns: 4; } }
      `}</style>
    </section>
  );
}
