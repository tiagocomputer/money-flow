import Link from "next/link";
import PricingCards from "./components/PricingCards";
import HeroSection from "./components/HeroSection";

const features = [
  {
    icon: "📊",
    title: "Controle de Fluxo de Caixa em Tempo Real",
    description:
      "Registro de entradas e saídas com categorização automática. Alertas de saldo crítico e projeções futuras.",
    color: "#2563EB",
  },
  {
    icon: "📈",
    title: "Dashboard Inteligente com KPIs Financeiros",
    description:
      "Gráficos de despesas por categoria, evolução de receita, margem e burn rate. Insights automáticos.",
    color: "#0EA5E9",
  },
  {
    icon: "🧾",
    title: "Gestão de Orçamentos e Metas",
    description:
      "Criação de orçamentos mensais/anuais por categoria. Alertas quando prestes a ultrapassar limites.",
    color: "#6366F1",
  },
  {
    icon: "🔐",
    title: "Segurança e Controle de Acesso",
    description:
      "Autenticação multifator (MFA), criptografia de dados, perfis de acesso e logs de auditoria completos.",
    color: "#EC4899",
  },
  {
    icon: "🤖",
    title: "Automação de Processos Financeiros",
    description:
      "Lançamentos recorrentes automáticos, classificação inteligente de transações e relatórios automáticos.",
    color: "#F59E0B",
  },
];


export default function LandingPage() {
  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "white", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.5rem" }}>💰</span>
            <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#2563EB" }}>MoneyFlow</span>
          </div>
          <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link href="#features" style={{ color: "#64748B", textDecoration: "none", fontSize: "0.875rem" }}>Funcionalidades</Link>
            <Link href="#pricing" style={{ color: "#64748B", textDecoration: "none", fontSize: "0.875rem" }}>Preços</Link>
            <Link href="/login" style={{ color: "#2563EB", border: "1px solid #2563EB", padding: "0.5rem 1rem", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>Entrar</Link>
            <Link href="/register" style={{ background: "#2563EB", color: "white", padding: "0.5rem 1rem", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>Começar grátis</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <section style={{ background: "white", padding: "3rem 2rem", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {[
            { num: "10k+", label: "Usuários ativos" },
            { num: "R$50M+", label: "Gerenciados" },
            { num: "99.9%", label: "Uptime" },
            { num: "4.9★", label: "Avaliação média" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#2563EB" }}>{s.num}</div>
              <div style={{ color: "#64748B", fontSize: "0.875rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "1rem" }}>
              Tudo que você precisa para controlar suas finanças
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.125rem", maxWidth: 600, margin: "0 auto" }}>
              Ferramentas poderosas para pessoa física, PMEs e startups
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: "1.75rem" }}>
                <div style={{ width: 48, height: 48, background: `${f.color}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "5rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "1rem" }}>
              Planos simples e transparentes
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.125rem" }}>Comece grátis e escale quando precisar</p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)", color: "white", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "1rem" }}>Comece a controlar suas finanças hoje</h2>
          <p style={{ opacity: 0.9, marginBottom: "2rem", fontSize: "1.125rem" }}>14 dias grátis, sem cartão de crédito, sem compromisso.</p>
          <Link href="/register" style={{ display: "inline-block", background: "white", color: "#2563EB", padding: "0.875rem 2.5rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
            Criar conta gratuita →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0F172A", color: "#94A3B8", padding: "2rem", textAlign: "center", fontSize: "0.875rem" }}>
        <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          <span>💰</span>
          <span style={{ color: "white", fontWeight: 700 }}>MoneyFlow</span>
        </div>
        <p>© 2024 MoneyFlow. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
