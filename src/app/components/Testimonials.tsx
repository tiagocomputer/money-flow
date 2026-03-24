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
    <div className="testimonial-card">
      <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
      <div className="testimonial-author">
        <div
          className="testimonial-avatar"
          style={{ background: t.author.color }}
        >
          {t.author.initials}
        </div>
        <div className="testimonial-info">
          <div className="testimonial-name">
            <span>{t.author.name}</span>
            {t.author.verified && <BadgeCheck size={13} className="testimonial-badge" />}
          </div>
          <div className="testimonial-role">
            {t.author.role} · {t.author.company}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeColumn({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  // Duplicate cards so the loop is seamless
  const doubled = [...items, ...items];
  return (
    <div className="marquee-column-wrapper">
      <div className={`marquee-column${reverse ? " marquee-reverse" : ""}`}>
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

// Split testimonials into 4 columns
function splitIntoColumns(items: Testimonial[], cols: number): Testimonial[][] {
  const columns: Testimonial[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => columns[i % cols].push(item));
  return columns;
}

export default function Testimonials() {
  const columns = splitIntoColumns(testimonials, 4);

  return (
    <section className="testimonials-section">
      {/* Header */}
      <div className="testimonials-header">
        <div className="testimonials-badge">Depoimentos</div>
        <h2 className="testimonials-title">O que nossos clientes dizem</h2>
        <p className="testimonials-subtitle">
          Mais de 10.000 profissionais e empresas confiam no MoneyFlow para controlar suas finanças.
        </p>
      </div>

      {/* Perspective container */}
      <div className="marquee-perspective">
        <div className="marquee-grid">
          {columns.map((col, i) => (
            <MarqueeColumn key={i} items={col} reverse={i % 2 === 1} />
          ))}
        </div>
        {/* Top & bottom fades */}
        <div className="marquee-fade-top" />
        <div className="marquee-fade-bottom" />
      </div>

      <style>{`
        .testimonials-section {
          padding: 5rem 2rem;
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          overflow: hidden;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .testimonials-badge {
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

        .testimonials-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .testimonials-subtitle {
          color: #64748B;
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
        }

        /* Perspective wrapper */
        .marquee-perspective {
          position: relative;
          height: 520px;
          overflow: hidden;
        }

        .marquee-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          height: 100%;
          transform: perspective(900px) rotateX(16deg) scale(1.05);
          transform-origin: center top;
        }

        /* Each column is a clipping window */
        .marquee-column-wrapper {
          overflow: hidden;
          height: 100%;
        }

        /* The scrolling strip */
        .marquee-column {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: marquee-up 28s linear infinite;
        }

        .marquee-column.marquee-reverse {
          animation: marquee-down 28s linear infinite;
        }

        @keyframes marquee-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes marquee-down {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        /* Pause on hover */
        .marquee-column-wrapper:hover .marquee-column {
          animation-play-state: paused;
        }

        /* Fades */
        .marquee-fade-top,
        .marquee-fade-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 100px;
          pointer-events: none;
          z-index: 2;
        }
        .marquee-fade-top {
          top: 0;
          background: linear-gradient(to bottom, #F8FAFC 10%, transparent);
        }
        .marquee-fade-bottom {
          bottom: 0;
          background: linear-gradient(to top, #F8FAFC 10%, transparent);
        }

        /* Card */
        .testimonial-card {
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 1.125rem;
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .testimonial-text {
          color: #334155;
          font-size: 0.85rem;
          line-height: 1.65;
          margin-bottom: 0.875rem;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .testimonial-avatar {
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

        .testimonial-info {
          min-width: 0;
        }

        .testimonial-name {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 700;
          font-size: 0.78rem;
          color: #0F172A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .testimonial-badge {
          color: #2563EB;
          flex-shrink: 0;
        }

        .testimonial-role {
          font-size: 0.68rem;
          color: #94A3B8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Mobile: show only 2 columns, no perspective */
        @media (max-width: 768px) {
          .marquee-perspective {
            height: 420px;
          }
          .marquee-grid {
            grid-template-columns: repeat(2, 1fr);
            transform: perspective(700px) rotateX(12deg) scale(1.04);
          }
          .marquee-column-wrapper:nth-child(3),
          .marquee-column-wrapper:nth-child(4) {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
