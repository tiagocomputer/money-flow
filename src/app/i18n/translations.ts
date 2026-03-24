export type Lang = 'pt-BR' | 'en' | 'fr';

export interface Translations {
  nav: {
    features: string;
    pricing: string;
    login: string;
    register: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    perk1: string;
    perk2: string;
    perk3: string;
  };
  stats: Array<{ num: string; label: string }>;
  features: {
    title: string;
    subtitle: string;
    items: Array<{ icon: string; title: string; description: string; color: string }>;
  };
  testimonials: {
    pill: string;
    title: string;
    subtitle: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    popular: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      cta: string;
      href: string;
      highlighted: boolean;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    btn: string;
  };
  footer: {
    copy: string;
  };
}

export const translations: Record<Lang, Translations> = {
  'pt-BR': {
    nav: {
      features: 'Funcionalidades',
      pricing: 'Preços',
      login: 'Entrar',
      register: 'Começar grátis',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    hero: {
      badge: '✨ Gerenciamento de Finanças Inteligente',
      title: 'QUER APRENDER A GERENCIAR SEU DINHEINHO DE FORMA INTELIGENTE?',
      subtitle: 'TENHA CONTROLE SOBRE SEU DINHEINHO',
      cta: 'Começar gratuitamente →',
      ctaSecondary: 'Ver funcionalidades',
      perk1: '✅ 14 dias grátis',
      perk2: '✅ Sem cartão de crédito',
      perk3: '✅ Cancele quando quiser',
    },
    stats: [
      { num: '10k+', label: 'Usuários ativos' },
      { num: 'R$50M+', label: 'Gerenciados' },
      { num: '99.9%', label: 'Uptime' },
      { num: '4.9★', label: 'Avaliação média' },
    ],
    features: {
      title: 'Tudo que você precisa para controlar suas finanças',
      subtitle: 'Ferramentas poderosas para pessoa física, PMEs e startups',
      items: [
        { icon: '📊', title: 'Controle de Fluxo de Caixa em Tempo Real', description: 'Registro de entradas e saídas com categorização automática. Alertas de saldo crítico e projeções futuras.', color: '#2563EB' },
        { icon: '📈', title: 'Dashboard Inteligente com KPIs Financeiros', description: 'Gráficos de despesas por categoria, evolução de receita, margem e burn rate. Insights automáticos.', color: '#0EA5E9' },
        { icon: '🧾', title: 'Gestão de Orçamentos e Metas', description: 'Criação de orçamentos mensais/anuais por categoria. Alertas quando prestes a ultrapassar limites.', color: '#6366F1' },
        { icon: '🔐', title: 'Segurança e Controle de Acesso', description: 'Autenticação multifator (MFA), criptografia de dados, perfis de acesso e logs de auditoria completos.', color: '#EC4899' },
        { icon: '🤖', title: 'Automação de Processos Financeiros', description: 'Lançamentos recorrentes automáticos, classificação inteligente de transações e relatórios automáticos.', color: '#F59E0B' },
      ],
    },
    testimonials: {
      pill: 'Depoimentos',
      title: 'O que nossos clientes dizem',
      subtitle: 'Mais de 10.000 profissionais e empresas confiam no MoneyFlow para controlar suas finanças.',
    },
    pricing: {
      title: 'Planos simples e transparentes',
      subtitle: 'Comece grátis e escale quando precisar',
      popular: 'MAIS POPULAR',
      plans: [
        { name: 'FREE', price: 'R$ 0', period: '/mês', description: 'Para começar', features: ['1 conta bancária', '20 transações/mês', 'Dashboard básico', 'Categorias padrão'], cta: 'Começar grátis', href: '/register', highlighted: false },
        { name: 'TRIAL', price: '14 dias', period: 'grátis', description: 'Experimente tudo', features: ['Tudo ilimitado', 'Dashboard completo', 'Relatórios automáticos', 'Suporte prioritário'], cta: 'Iniciar trial', href: '/register?plan=trial', highlighted: false },
        { name: 'PRO', price: 'R$ 97', period: '/mês', description: 'Para quem é sério', features: ['Contas ilimitadas', 'Transações ilimitadas', 'KPIs avançados', 'Automações', 'Relatórios completos', 'Suporte prioritário'], cta: 'Assinar PRO', href: '/register?plan=pro', highlighted: true },
      ],
    },
    cta: {
      title: 'Comece a controlar suas finanças hoje',
      subtitle: '14 dias grátis, sem cartão de crédito, sem compromisso.',
      btn: 'Criar conta gratuita →',
    },
    footer: { copy: '© 2024 MoneyFlow. Todos os direitos reservados.' },
  },

  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      login: 'Sign in',
      register: 'Get started free',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      badge: '✨ Smart Finance Management',
      title: 'WANT TO LEARN HOW TO MANAGE YOUR MONEY THE SMART WAY?',
      subtitle: 'TAKE FULL CONTROL OF YOUR FINANCES',
      cta: 'Get started for free →',
      ctaSecondary: 'See features',
      perk1: '✅ 14-day free trial',
      perk2: '✅ No credit card required',
      perk3: '✅ Cancel anytime',
    },
    stats: [
      { num: '10k+', label: 'Active users' },
      { num: '$50M+', label: 'Managed' },
      { num: '99.9%', label: 'Uptime' },
      { num: '4.9★', label: 'Average rating' },
    ],
    features: {
      title: 'Everything you need to control your finances',
      subtitle: 'Powerful tools for individuals, SMEs and startups',
      items: [
        { icon: '📊', title: 'Real-Time Cash Flow Control', description: 'Track income and expenses with automatic categorization. Critical balance alerts and future projections.', color: '#2563EB' },
        { icon: '📈', title: 'Smart Dashboard with Financial KPIs', description: 'Expense charts by category, revenue growth, margin and burn rate. Automatic insights.', color: '#0EA5E9' },
        { icon: '🧾', title: 'Budget & Goals Management', description: 'Create monthly/annual budgets by category. Alerts when you are about to exceed limits.', color: '#6366F1' },
        { icon: '🔐', title: 'Security & Access Control', description: 'Multi-factor authentication (MFA), data encryption, access profiles and full audit logs.', color: '#EC4899' },
        { icon: '🤖', title: 'Financial Process Automation', description: 'Automatic recurring entries, intelligent transaction classification and automatic reports.', color: '#F59E0B' },
      ],
    },
    testimonials: {
      pill: 'Testimonials',
      title: 'What our customers say',
      subtitle: 'More than 10,000 professionals and companies trust MoneyFlow to manage their finances.',
    },
    pricing: {
      title: 'Simple, transparent pricing',
      subtitle: 'Start free and scale when you need',
      popular: 'MOST POPULAR',
      plans: [
        { name: 'FREE', price: '$0', period: '/mo', description: 'To get started', features: ['1 bank account', '20 transactions/mo', 'Basic dashboard', 'Default categories'], cta: 'Start free', href: '/register', highlighted: false },
        { name: 'TRIAL', price: '14 days', period: 'free', description: 'Try everything', features: ['Unlimited everything', 'Full dashboard', 'Automatic reports', 'Priority support'], cta: 'Start trial', href: '/register?plan=trial', highlighted: false },
        { name: 'PRO', price: '$19', period: '/mo', description: 'For serious users', features: ['Unlimited accounts', 'Unlimited transactions', 'Advanced KPIs', 'Automations', 'Full reports', 'Priority support'], cta: 'Subscribe PRO', href: '/register?plan=pro', highlighted: true },
      ],
    },
    cta: {
      title: 'Start controlling your finances today',
      subtitle: '14-day free trial, no credit card, no commitment.',
      btn: 'Create free account →',
    },
    footer: { copy: '© 2024 MoneyFlow. All rights reserved.' },
  },

  fr: {
    nav: {
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      login: 'Connexion',
      register: 'Commencer gratuitement',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
    },
    hero: {
      badge: '✨ Gestion Financière Intelligente',
      title: 'VOULEZ-VOUS APPRENDRE À GÉRER VOS FINANCES DE FAÇON INTELLIGENTE ?',
      subtitle: 'PRENEZ LE CONTRÔLE DE VOS FINANCES',
      cta: 'Commencer gratuitement →',
      ctaSecondary: 'Voir les fonctionnalités',
      perk1: '✅ 14 jours gratuits',
      perk2: '✅ Sans carte de crédit',
      perk3: '✅ Annulez quand vous voulez',
    },
    stats: [
      { num: '10k+', label: 'Utilisateurs actifs' },
      { num: '50M€+', label: 'Gérés' },
      { num: '99.9%', label: 'Disponibilité' },
      { num: '4.9★', label: 'Note moyenne' },
    ],
    features: {
      title: 'Tout ce dont vous avez besoin pour gérer vos finances',
      subtitle: 'Outils puissants pour les particuliers, PME et startups',
      items: [
        { icon: '📊', title: 'Contrôle des flux de trésorerie en temps réel', description: 'Enregistrement des entrées et sorties avec catégorisation automatique. Alertes de solde critique et projections futures.', color: '#2563EB' },
        { icon: '📈', title: 'Tableau de bord intelligent avec KPIs financiers', description: "Graphiques de dépenses par catégorie, évolution des revenus, marge et burn rate. Analyses automatiques.", color: '#0EA5E9' },
        { icon: '🧾', title: 'Gestion des budgets et des objectifs', description: 'Création de budgets mensuels/annuels par catégorie. Alertes lorsque vous êtes sur le point de dépasser les limites.', color: '#6366F1' },
        { icon: '🔐', title: 'Sécurité et contrôle des accès', description: "Authentification multifacteur (MFA), chiffrement des données, profils d'accès et journaux d'audit complets.", color: '#EC4899' },
        { icon: '🤖', title: 'Automatisation des processus financiers', description: 'Saisies récurrentes automatiques, classification intelligente des transactions et rapports automatiques.', color: '#F59E0B' },
      ],
    },
    testimonials: {
      pill: 'Témoignages',
      title: 'Ce que disent nos clients',
      subtitle: 'Plus de 10 000 professionnels et entreprises font confiance à MoneyFlow pour gérer leurs finances.',
    },
    pricing: {
      title: 'Des tarifs simples et transparents',
      subtitle: 'Commencez gratuitement et évoluez selon vos besoins',
      popular: 'LE PLUS POPULAIRE',
      plans: [
        { name: 'FREE', price: '0€', period: '/mois', description: 'Pour démarrer', features: ['1 compte bancaire', '20 transactions/mois', 'Tableau de bord basique', 'Catégories par défaut'], cta: 'Commencer gratuitement', href: '/register', highlighted: false },
        { name: 'TRIAL', price: '14 jours', period: 'gratuit', description: 'Essayez tout', features: ['Tout illimité', 'Tableau de bord complet', 'Rapports automatiques', 'Support prioritaire'], cta: "Démarrer l'essai", href: '/register?plan=trial', highlighted: false },
        { name: 'PRO', price: '19€', period: '/mois', description: 'Pour les utilisateurs sérieux', features: ['Comptes illimités', 'Transactions illimitées', 'KPIs avancés', 'Automatisations', 'Rapports complets', 'Support prioritaire'], cta: "S'abonner PRO", href: '/register?plan=pro', highlighted: true },
      ],
    },
    cta: {
      title: "Commencez à contrôler vos finances aujourd'hui",
      subtitle: '14 jours gratuits, sans carte de crédit, sans engagement.',
      btn: 'Créer un compte gratuit →',
    },
    footer: { copy: '© 2024 MoneyFlow. Tous droits réservés.' },
  },
};
