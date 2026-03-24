"use client";

import { BadgeCheck } from "lucide-react";

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
    text: "O MoneyFlow transformou como gerencio as finanças do meu negócio. Antes perdia horas em planilhas, agora tenho tudo em tempo real.",
    author: { name: "Ana Paula Ferreira", role: "Empreendedora", company: "Studio AP", initials: "AP", color: "#2563EB", verified: true },
  },
  {
    text: "Finalmente consegui separar minhas finanças pessoais das profissionais. Os relatórios são incríveis e me ajudam a planejar os próximos meses.",
    author: { name: "Carlos Eduardo Lima", role: "Dev Freelancer", company: "Autônomo", initials: "CE", color: "#0EA5E9", verified: true },
  },
  {
    text: "Implementamos o MoneyFlow em toda a empresa. A visibilidade dos fluxos de caixa melhorou muito a nossa tomada de decisão estratégica.",
    author: { name: "Mariana Costa", role: "Diretora Financeira", company: "TechStart BR", initials: "MC", color: "#6366F1", verified: true },
  },
  {
    text: "Interface linda e super intuitiva. Em menos de 10 minutos já estava usando de verdade. Recomendo para qualquer profissional.",
    author: { name: "Rafael Souza", role: "Designer UI/UX", company: "Agência Pixel", initials: "RS", color: "#EC4899", verified: false },
  },
  {
    text: "Minha clínica cresceu muito com o controle financeiro que o MoneyFlow oferece. Tenho clareza sobre cada centavo que entra e sai.",
    author: { name: "Juliana Mendes", role: "Médica", company: "Clínica JM", initials: "JM", color: "#22C55E", verified: true },
  },
  {
    text: "Nunca pensei que um software de finanças pudesse ser tão fácil de usar. Minha equipe adorou e os resultados foram imediatos.",
    author: { name: "Pedro Alves", role: "CEO", company: "Construções PA", initials: "PA", color: "#F59E0B", verified: false },
  },
  {
    text: "Os alertas de orçamento são fantásticos. Evitei várias surpresas desagradáveis graças aos avisos automáticos do sistema.",
    author: { name: "Fernanda Rocha", role: "Consultora", company: "FR Soluções", initials: "FR", color: "#8B5CF6", verified: true },
  },
  {
    text: "A função de metas financeiras me motivou a poupar de verdade. Já atingi dois objetivos que estavam parados há anos.",
    author: { name: "Bruno Oliveira", role: "Arquiteto", company: "Studio BO", initials: "BO", color: "#0F172A", verified: false },
  },
  {
    text: "Simples, bonito e eficiente. Uso tanto no celular quanto no computador e a experiência é sempre excelente.",
    author: { name: "Larissa Nunes", role: "Professora", company: "Escola Saber", initials: "LN", color: "#EF4444", verified: true },
  },
  {
    text: "Gerencio os projetos dos clientes e as finanças pessoais no mesmo lugar. Dashboard claro sem precisar de planilhas.",
    author: { name: "Diego Carvalho", role: "Engenheiro Civil", company: "DC Projetos", initials: "DC", color: "#059669", verified: false },
  },
  {
    text: "Depois de testar vários apps financeiros, o MoneyFlow foi o único que realmente ficou no meu dia a dia. Curva de aprendizado zero.",
    author: { name: "Isabela Martins", role: "Advogada", company: "Martins & Assoc.", initials: "IM", color: "#D97706", verified: true },
  },
  {
    text: "Em 3 meses já identificamos onde estávamos perdendo dinheiro. O ROI foi imediato. Ferramenta imprescindível para PMEs.",
    author: { name: "Roberto Santos", role: "Comerciante", company: "Loja RS", initials: "RS", color: "#7C3AED", verified: false },
  },
  {
    text: "Controlo todas as entradas e saídas da minha equipe de vendas em tempo real. Os relatórios mensais me poupam horas de trabalho.",
    author: { name: "Tatiane Borges", role: "Gerente Comercial", company: "Borges Vendas", initials: "TB", color: "#0284C7", verified: true },
  },
  {
    text: "A integração bancária automática foi um divisor de águas. Não preciso mais lançar nada manualmente.",
    author: { name: "Marcelo Figueiredo", role: "Contador", company: "MF Contabilidade", initials: "MF", color: "#DC2626", verified: true },
  },
  {
    text: "Recomendo para todos os meus clientes que precisam de clareza financeira. O suporte é ágil e atencioso.",
    author: { name: "Camila Torres", role: "Coach Financeira", company: "Autônoma", initials: "CT", color: "#7E22CE", verified: false },
  },
  {
    text: "Finalmente consigo ver o meu lucro real separado do faturamento. Isso mudou completamente minha gestão.",
    author: { name: "Lucas Pereira", role: "Dentista", company: "Clínica LP", initials: "LP", color: "#16A34A", verified: true },
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="t-card">
      <p className="t-text">&ldquo;{t.text}&rdquo;</p>
      <div className="t-author">
        <div className="t-avatar" style={{ background: t.author.color }}>
          {t.author.initials}
        </div>
        <div className="t-info">
          <div className="t-name">
            <span>{t.author.name}</span>
            {t.author.verified && <BadgeCheck size={13} className="t-badge" />}
          </div>
          <div className="t-role">{t.author.role} · {t.author.company}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeColumn({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="t-col-wrapper">
      <div className={`t-col${reverse ? " t-col-rev" : ""}`}>
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

function splitIntoColumns(items: Testimonial[], cols: number): Testimonial[][] {
  const columns: Testimonial[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => columns[i % cols].push(item));
  return columns;
}

export default function Testimonials() {
  const columns = splitIntoColumns(testimonials, 4);

  return (
    <section className="t-section">
      {/* Header */}
      <div className="t-header">
        <div className="t-badge-pill">Depoimentos</div>
        <h2 className="t-title">O que nossos clientes dizem</h2>
        <p className="t-subtitle">
          Mais de 10.000 profissionais e empresas confiam no MoneyFlow para controlar suas finanças.
        </p>
      </div>

      {/* Marquee — matches: relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px] */}
      <div className="t-marquee-outer">
        <div className="t-marquee-inner">
          {columns.map((col, i) => (
            <MarqueeColumn key={i} items={col} reverse={i % 2 === 1} />
          ))}
        </div>
        <div className="t-fade-left" />
        <div className="t-fade-right" />
        <div className="t-fade-top" />
        <div className="t-fade-bottom" />
      </div>

      <style>{`
        /* ── Section ── */
        .t-section {
          padding: 6rem 2rem;
          background: white;
          overflow: hidden;
        }

        .t-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .t-badge-pill {
          display: inline-block;
          background: #EFF6FF;
          color: #2563EB;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.875rem;
          border-radius: 100px;
          margin-bottom: 0.875rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .t-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .t-subtitle {
          color: #64748B;
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── Marquee outer: matches the selector exactly ── */
        .t-marquee-outer {
          position: relative;
          display: flex;
          height: 500px;
          width: 100%;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* ── Inner container with perspective:300px ── */
        .t-marquee-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6px; /* gap-1.5 = 6px */
          height: 100%;
          width: 100%;
          perspective: 300px;
        }

        /* ── Each column ── */
        .t-col-wrapper {
          flex: 1;
          overflow: hidden;
          height: 100%;
          max-width: 280px;
        }

        .t-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
          animation: t-up 30s linear infinite;
        }

        .t-col-rev {
          animation: t-down 30s linear infinite;
        }

        @keyframes t-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }

        @keyframes t-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }

        .t-col-wrapper:hover .t-col {
          animation-play-state: paused;
        }

        /* ── Fades ── */
        .t-fade-left,
        .t-fade-right,
        .t-fade-top,
        .t-fade-bottom {
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }

        .t-fade-left {
          left: 0; top: 0; bottom: 0; width: 80px;
          background: linear-gradient(to right, white 20%, transparent);
        }

        .t-fade-right {
          right: 0; top: 0; bottom: 0; width: 80px;
          background: linear-gradient(to left, white 20%, transparent);
        }

        .t-fade-top {
          top: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to bottom, white 10%, transparent);
        }

        .t-fade-bottom {
          bottom: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to top, white 10%, transparent);
        }

        /* ── Card ── */
        .t-card {
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 1.125rem;
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          width: 100%;
        }

        .t-text {
          color: #334155;
          font-size: 0.85rem;
          line-height: 1.65;
          margin-bottom: 0.875rem;
        }

        .t-author {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .t-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          flex-shrink: 0;
          border: 2px solid #F1F5F9;
        }

        .t-info { min-width: 0; }

        .t-name {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 700;
          font-size: 0.78rem;
          color: #0F172A;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .t-badge { color: #2563EB; flex-shrink: 0; }

        .t-role {
          font-size: 0.68rem;
          color: #94A3B8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .t-section { padding: 4rem 1rem; }
          .t-marquee-outer { height: 420px; }
          .t-col-wrapper:nth-child(3),
          .t-col-wrapper:nth-child(4) { display: none; }
          .t-col-wrapper { max-width: 50%; }
        }
      `}</style>
    </section>
  );
}
