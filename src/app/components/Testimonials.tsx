"use client";

import { useAppContext } from "../context/AppContext";

interface Testimonial {
  text: string;
  author: {
    name: string;
    handle: string;
    avatar: string; // pravatar img id
    flag: string;
    city: string;
  };
}

const testimonials: Testimonial[] = [
  {
    text: "O MoneyFlow transformou como gerencio as finanças. Antes perdia horas em planilhas, agora tenho tudo em tempo real e consigo tomar decisões muito mais rápido.",
    author: { name: "Ana Paula Ferreira", handle: "@anapaula", avatar: "1", flag: "🇧🇷", city: "São Paulo" },
  },
  {
    text: "Finalmente consegui separar minhas finanças pessoais das profissionais. Os relatórios são incríveis e me ajudam a planejar os próximos meses.",
    author: { name: "Carlos Eduardo Lima", handle: "@carlosedu", avatar: "11", flag: "🇧🇷", city: "Curitiba" },
  },
  {
    text: "Implementamos em toda a empresa. A visibilidade dos fluxos de caixa melhorou muito a nossa tomada de decisão estratégica. Recomendo para qualquer gestor.",
    author: { name: "Mariana Costa", handle: "@marianac", avatar: "5", flag: "🇧🇷", city: "Florianópolis" },
  },
  {
    text: "Interface linda e super intuitiva. Em menos de 10 minutos já estava usando de verdade. Recomendo para qualquer profissional criativo.",
    author: { name: "Rafael Souza", handle: "@rafaels", avatar: "12", flag: "🇧🇷", city: "Rio de Janeiro" },
  },
  {
    text: "Minha clínica cresceu muito com o controle financeiro que o MoneyFlow oferece. Tenho clareza sobre cada centavo que entra e sai. Ferramenta essencial.",
    author: { name: "Juliana Mendes", handle: "@julianam", avatar: "9", flag: "🇧🇷", city: "Belo Horizonte" },
  },
  {
    text: "Nunca pensei que um software de finanças pudesse ser tão fácil de usar. Minha equipe adorou, e os resultados foram imediatos. O suporte também é excelente.",
    author: { name: "Pedro Alves", handle: "@pedroalves", avatar: "15", flag: "🇧🇷", city: "Brasília" },
  },
  {
    text: "Os alertas de orçamento são fantásticos. Evitei várias surpresas desagradáveis graças aos avisos automáticos. Vale muito cada centavo da assinatura.",
    author: { name: "Fernanda Rocha", handle: "@fernr", avatar: "10", flag: "🇧🇷", city: "Porto Alegre" },
  },
  {
    text: "A função de metas financeiras me motivou a poupar de verdade. Já atingi dois objetivos que estavam parados há anos nas minhas resoluções.",
    author: { name: "Bruno Oliveira", handle: "@brunoo", avatar: "17", flag: "🇧🇷", city: "Salvador" },
  },
  {
    text: "Simples, bonito e eficiente. Uso tanto no celular quanto no computador e a experiência é sempre excelente. Um dos melhores investimentos que fiz.",
    author: { name: "Larissa Nunes", handle: "@larissan", avatar: "20", flag: "🇧🇷", city: "Fortaleza" },
  },
  {
    text: "Gerencio os projetos dos clientes e as finanças pessoais no mesmo lugar. O dashboard me dá uma visão clara do meu fluxo de caixa mensal.",
    author: { name: "Diego Carvalho", handle: "@diegoc", avatar: "22", flag: "🇧🇷", city: "Recife" },
  },
  {
    text: "Depois de testar vários apps financeiros, o MoneyFlow foi o único que realmente ficou no meu dia a dia. A curva de aprendizado é zero.",
    author: { name: "Isabela Santos", handle: "@isa", avatar: "25", flag: "🇧🇷", city: "Brasília" },
  },
  {
    text: "Começamos a usar para controle da loja e em 3 meses já identificamos onde estávamos perdendo dinheiro. O ROI foi imediato.",
    author: { name: "Marcelo Figueiredo", handle: "@marcelo", avatar: "27", flag: "🇧🇷", city: "Manaus" },
  },
  {
    text: "Controlo todas as entradas e saídas da minha equipe de vendas em tempo real. Os relatórios mensais me poupam horas de trabalho toda semana.",
    author: { name: "Tatiane Borges", handle: "@tatib", avatar: "32", flag: "🇧🇷", city: "Goiânia" },
  },
  {
    text: "A integração bancária automática foi um divisor de águas. Não preciso mais lançar nada manualmente. Poupa pelo menos 2 horas por semana.",
    author: { name: "Lucas Ferreira", handle: "@lucas", avatar: "33", flag: "🇧🇷", city: "São Paulo" },
  },
  {
    text: "Recomendo para todos os meus clientes que precisam de clareza financeira. A plataforma é robusta e o suporte é ágil e atencioso.",
    author: { name: "Camila Torres", handle: "@camit", avatar: "39", flag: "🇧🇷", city: "Campo Grande" },
  },
  {
    text: "Finalmente consigo ver o meu lucro real separado do faturamento. Isso mudou completamente minha gestão e minha tranquilidade financeira.",
    author: { name: "Mariana Silva", handle: "@mari", avatar: "44", flag: "🇧🇷", city: "São Paulo" },
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="t-card">
      <div className="t-card-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.pravatar.cc/80?img=${t.author.avatar}`}
          alt={t.author.name}
          className="t-avatar"
          loading="lazy"
        />
        <div className="t-author-info">
          <div className="t-name">{t.author.name}</div>
          <div className="t-handle">{t.author.handle}</div>
          <div className="t-location">
            <span>{t.author.flag}</span>
            <span className="t-city">{t.author.city}</span>
          </div>
        </div>
      </div>
      <p className="t-text">{t.text}</p>
    </div>
  );
}

function MarqueeColumn({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="t-col-wrap">
      <div className={`t-col${reverse ? " t-rev" : ""}`}>
        {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
      </div>
    </div>
  );
}

function chunk(arr: Testimonial[], cols: number): Testimonial[][] {
  const out: Testimonial[][] = Array.from({ length: cols }, () => []);
  arr.forEach((item, i) => out[i % cols].push(item));
  return out;
}

export default function Testimonials() {
  const { t } = useAppContext();
  const columns = chunk(testimonials, 4);

  return (
    /* Same outer padding as every other section on the page */
    <section className="t-section">
      {/* Same 1200px container used by Features, Stats, etc. */}
      <div className="t-container">

        {/* Header — identical typographic scale to Features section */}
        <div className="t-header">
          <div className="t-pill">{t.testimonials.pill}</div>
          <h2 className="t-title">{t.testimonials.title}</h2>
          <p className="t-sub">{t.testimonials.subtitle}</p>
        </div>

        {/* Stage lives inside the container — never exceeds 1200px */}
        <div className="t-stage">
          <div className="t-grid">
            {columns.map((col, i) => (
              <MarqueeColumn key={i} items={col} reverse={i % 2 === 1} />
            ))}
          </div>

          <div className="t-fade t-fade-top" />
          <div className="t-fade t-fade-bottom" />
          <div className="t-fade t-fade-left" />
          <div className="t-fade t-fade-right" />
        </div>

      </div>

      <style>{`
        /* ── Section: matches all other landing sections ── */
        .t-section {
          padding: 5rem 2rem;
          background: white;
          overflow: hidden;
        }

        /* ── Container: same 1200px grid as Features / Pricing ── */
        .t-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .t-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .t-pill {
          display: inline-block;
          background: #EFF6FF;
          color: #2563EB;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.3rem 0.9rem;
          border-radius: 100px;
          margin-bottom: 1rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* Matches Features h2: 2.25rem / 800 */
        .t-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        /* Matches Features subtitle: 1.125rem, max-w 600 */
        .t-sub {
          color: #64748B;
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ── Stage: perspective container, bounded by the 1200px grid ── */
        .t-stage {
          position: relative;
          height: 500px;
          overflow: hidden;
          border-radius: 16px;
          perspective: 700px;
          perspective-origin: 50% 38%;
        }

        /* ── Grid: 3D tilt — no extra padding needed (container handles it) ── */
        .t-grid {
          display: flex;
          flex-direction: row;
          gap: 12px;
          height: 100%;
          transform: rotateX(20deg) rotateZ(-4deg) scale(1.08);
          transform-origin: center center;
          transform-style: preserve-3d;
        }

        /* ── Column wrapper ── */
        .t-col-wrap {
          flex: 1;
          overflow: hidden;
          height: 100%;
          min-width: 0;
        }

        /* ── Scrolling strip ── */
        .t-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: t-up 32s linear infinite;
        }

        .t-rev {
          animation: t-down 32s linear infinite;
        }

        @keyframes t-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }

        @keyframes t-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }

        .t-col-wrap:hover .t-col {
          animation-play-state: paused;
        }

        /* ── Card — same border/radius/shadow tokens as Features cards ── */
        .t-card {
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          flex-shrink: 0;
          width: 100%;
        }

        .t-card-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.875rem;
        }

        .t-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid #F1F5F9;
        }

        .t-author-info {
          min-width: 0;
          flex: 1;
        }

        .t-name {
          font-weight: 700;
          font-size: 0.875rem;
          color: #0F172A;
          line-height: 1.25;
        }

        .t-handle {
          font-size: 0.75rem;
          color: #94A3B8;
          margin-top: 0.1rem;
        }

        .t-location {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.25rem;
          font-size: 0.72rem;
        }

        .t-city {
          color: #64748B;
          font-weight: 500;
        }

        .t-text {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #374151;
          margin: 0;
        }

        /* ── Fades — reference the stage bounds, not the viewport ── */
        .t-fade {
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }

        .t-fade-top {
          top: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to bottom, white 10%, transparent);
        }

        .t-fade-bottom {
          bottom: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to top, white 10%, transparent);
        }

        .t-fade-left {
          left: 0; top: 0; bottom: 0; width: 80px;
          background: linear-gradient(to right, white 15%, transparent);
        }

        .t-fade-right {
          right: 0; top: 0; bottom: 0; width: 80px;
          background: linear-gradient(to left, white 15%, transparent);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .t-section { padding: 4rem 1.25rem; }
          .t-title { font-size: 1.75rem; }
          .t-stage { height: 400px; perspective: 450px; }
          .t-grid { transform: rotateX(18deg) rotateZ(-3deg) scale(1.05); gap: 8px; }
          .t-col-wrap:nth-child(3),
          .t-col-wrap:nth-child(4) { display: none; }
        }
      `}</style>
    </section>
  );
}
