export type Lang = 'pt-BR' | 'en' | 'fr';

export interface DashboardTranslations {
  loading: string;
  cancel: string;
  save: string;
  saving: string;
  nav: { dashboard: string; transactions: string; budgets: string; goals: string; logout: string };
  home: {
    title: string; subtitle: string;
    totalBalance: string; income: string; expenses: string; cashFlow: string;
    chartRevExp: string; chartExpCat: string; noExpenses: string;
    recentTx: string; noTx: string; viewAll: string;
    budgetsTitle: string; noBudgets: string; manage: string;
    goalsTitle: string;
  };
  transactions: {
    title: string; subtitle: string; newBtn: string;
    filterAll: string; filterIncome: string; filterExpense: string;
    modalTitle: string;
    typeLabel: string; typeIncome: string; typeExpense: string; typeTransfer: string;
    amountLabel: string; accountLabel: string; categoryLabel: string; noCategory: string;
    descLabel: string; descPlaceholder: string; dateLabel: string; recurringLabel: string;
    saveBtn: string; empty: string;
    colDesc: string; colCategory: string; colAccount: string; colDate: string; colAmount: string;
    recurringBadge: string;
    deleteConfirm: string;
  };
  budgets: {
    title: string; subtitle: string; newBtn: string;
    modalTitle: string; nameLabel: string; namePlaceholder: string;
    limitLabel: string; categoryLabel: string; noCategory: string;
    periodLabel: string; weekly: string; monthly: string; quarterly: string; annual: string;
    startDateLabel: string; createBtn: string;
    empty: string; emptyHint: string; general: string;
    over: string; warn: string; used: string; remaining: string;
    deleteConfirm: string;
  };
  goals: {
    title: string; subtitle: string; newBtn: string;
    modalTitle: string; nameLabel: string; namePlaceholder: string;
    targetLabel: string; currentLabel: string; deadlineLabel: string; createBtn: string;
    updateTitle: string; updateCurrentLabel: string; updateBtn: string;
    empty: string; emptyHint: string;
    reached: string; remaining: string; deadline: string;
    deleteConfirm: string; updateAction: string;
  };
  export: {
    btn: string;
    excelLabel: string; excelHint: string;
    pdfLabel: string; pdfHint: string;
    generatedOn: string; autoReport: string;
    noDeadline: string; progress: string;
    status: string; metric: string; value: string;
    spent: string;
    done: string; inProgress: string; exceeded: string; warning: string; ok: string;
  };
}

export interface LoginTranslations {
  title: string;
  subtitle: string;
  emailPlaceholder: string;
  passwordLabel: string;
  submitBtn: string;
  submitting: string;
  noAccount: string;
  createAccount: string;
  backHome: string;
}

export interface Translations {
  login: LoginTranslations;
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
  dashboard: DashboardTranslations;
}

export const translations: Record<Lang, Translations> = {
  'pt-BR': {
    login: {
      title: 'Entrar na sua conta',
      subtitle: 'Bem-vindo de volta!',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      submitBtn: 'Entrar',
      submitting: 'Entrando…',
      noAccount: 'Não tem conta?',
      createAccount: 'Criar conta grátis',
      backHome: '← Voltar ao início',
    },
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
    footer: { copy: '© 2026 MoneyFlow. Todos os direitos reservados.' },
    dashboard: {
      loading: 'Carregando...',
      cancel: 'Cancelar',
      save: 'Salvar',
      saving: 'Salvando...',
      nav: { dashboard: 'Dashboard', transactions: 'Transações', budgets: 'Orçamentos', goals: 'Metas', logout: 'Sair' },
      home: {
        title: 'Dashboard', subtitle: 'Visão geral das suas finanças',
        totalBalance: 'Saldo Total', income: 'Receitas (mês)', expenses: 'Despesas (mês)', cashFlow: 'Fluxo de Caixa',
        chartRevExp: 'Receitas vs Despesas (6 meses)', chartExpCat: 'Despesas por Categoria', noExpenses: 'Nenhuma despesa este mês',
        recentTx: 'Últimas Transações', noTx: 'Nenhuma transação este mês', viewAll: 'Ver todas',
        budgetsTitle: 'Orçamentos', noBudgets: 'Nenhum orçamento criado', manage: 'Gerenciar',
        goalsTitle: 'Metas Financeiras',
      },
      transactions: {
        title: 'Transações', subtitle: 'Gerencie suas entradas e saídas', newBtn: '+ Nova Transação',
        filterAll: 'Todas', filterIncome: 'Receitas', filterExpense: 'Despesas',
        modalTitle: 'Nova Transação',
        typeLabel: 'Tipo', typeIncome: 'Receita', typeExpense: 'Despesa', typeTransfer: 'Transferência',
        amountLabel: 'Valor (R$)', accountLabel: 'Conta', categoryLabel: 'Categoria', noCategory: 'Sem categoria',
        descLabel: 'Descrição', descPlaceholder: 'Opcional', dateLabel: 'Data', recurringLabel: 'Recorrente',
        saveBtn: 'Salvar', empty: 'Nenhuma transação encontrada',
        colDesc: 'Descrição', colCategory: 'Categoria', colAccount: 'Conta', colDate: 'Data', colAmount: 'Valor',
        recurringBadge: 'RECORRENTE', deleteConfirm: 'Excluir transação?',
      },
      budgets: {
        title: 'Orçamentos', subtitle: 'Controle seus limites de gastos', newBtn: '+ Novo Orçamento',
        modalTitle: 'Novo Orçamento', nameLabel: 'Nome', namePlaceholder: 'Ex: Alimentação do mês',
        limitLabel: 'Limite (R$)', categoryLabel: 'Categoria', noCategory: 'Sem categoria',
        periodLabel: 'Período', weekly: 'Semanal', monthly: 'Mensal', quarterly: 'Trimestral', annual: 'Anual',
        startDateLabel: 'Data de início', createBtn: 'Criar Orçamento',
        empty: 'Nenhum orçamento criado', emptyHint: 'Crie orçamentos para controlar seus gastos', general: 'Geral',
        over: 'Limite ultrapassado!', warn: 'Atenção: 80%+', used: '% utilizado', remaining: 'Restam',
        deleteConfirm: 'Excluir orçamento?',
      },
      goals: {
        title: 'Metas Financeiras', subtitle: 'Defina e acompanhe seus objetivos', newBtn: '+ Nova Meta',
        modalTitle: 'Nova Meta', nameLabel: 'Nome da meta', namePlaceholder: 'Ex: Fundo de emergência',
        targetLabel: 'Valor alvo (R$)', currentLabel: 'Valor atual (R$)', deadlineLabel: 'Prazo (opcional)', createBtn: 'Criar Meta',
        updateTitle: 'Atualizar progresso', updateCurrentLabel: 'Valor atual (R$)', updateBtn: 'Atualizar',
        empty: 'Nenhuma meta criada', emptyHint: 'Defina objetivos financeiros para acompanhar seu progresso',
        reached: 'Meta atingida!', remaining: 'faltam', deadline: 'Prazo:',
        deleteConfirm: 'Excluir meta?', updateAction: 'Atualizar',
      },
      export: {
        btn: 'Exportar',
        excelLabel: 'Excel (.csv)', excelHint: 'Abrir no Excel ou Sheets',
        pdfLabel: 'PDF', pdfHint: 'Salvar ou imprimir',
        generatedOn: 'Gerado em', autoReport: 'MoneyFlow — Relatório gerado automaticamente',
        noDeadline: 'Sem prazo', progress: 'Progresso',
        status: 'Status', metric: 'Métrica', value: 'Valor',
        spent: 'Gasto',
        done: 'Concluída', inProgress: 'Em andamento', exceeded: 'Excedido', warning: 'Atenção', ok: 'OK',
      },
    },
  },

  en: {
    login: {
      title: 'Sign in to your account',
      subtitle: 'Welcome back!',
      emailPlaceholder: 'your@email.com',
      passwordLabel: 'Password',
      submitBtn: 'Sign in',
      submitting: 'Signing in…',
      noAccount: "Don't have an account?",
      createAccount: 'Create free account',
      backHome: '← Back to home',
    },
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
    footer: { copy: '© 2026 MoneyFlow. All rights reserved.' },
    dashboard: {
      loading: 'Loading...',
      cancel: 'Cancel',
      save: 'Save',
      saving: 'Saving...',
      nav: { dashboard: 'Dashboard', transactions: 'Transactions', budgets: 'Budgets', goals: 'Goals', logout: 'Sign out' },
      home: {
        title: 'Dashboard', subtitle: 'Overview of your finances',
        totalBalance: 'Total Balance', income: 'Income (month)', expenses: 'Expenses (month)', cashFlow: 'Cash Flow',
        chartRevExp: 'Income vs Expenses (6 months)', chartExpCat: 'Expenses by Category', noExpenses: 'No expenses this month',
        recentTx: 'Recent Transactions', noTx: 'No transactions this month', viewAll: 'View all',
        budgetsTitle: 'Budgets', noBudgets: 'No budgets created', manage: 'Manage',
        goalsTitle: 'Financial Goals',
      },
      transactions: {
        title: 'Transactions', subtitle: 'Manage your income and expenses', newBtn: '+ New Transaction',
        filterAll: 'All', filterIncome: 'Income', filterExpense: 'Expenses',
        modalTitle: 'New Transaction',
        typeLabel: 'Type', typeIncome: 'Income', typeExpense: 'Expense', typeTransfer: 'Transfer',
        amountLabel: 'Amount ($)', accountLabel: 'Account', categoryLabel: 'Category', noCategory: 'No category',
        descLabel: 'Description', descPlaceholder: 'Optional', dateLabel: 'Date', recurringLabel: 'Recurring',
        saveBtn: 'Save', empty: 'No transactions found',
        colDesc: 'Description', colCategory: 'Category', colAccount: 'Account', colDate: 'Date', colAmount: 'Amount',
        recurringBadge: 'RECURRING', deleteConfirm: 'Delete transaction?',
      },
      budgets: {
        title: 'Budgets', subtitle: 'Control your spending limits', newBtn: '+ New Budget',
        modalTitle: 'New Budget', nameLabel: 'Name', namePlaceholder: 'e.g. Monthly groceries',
        limitLabel: 'Limit ($)', categoryLabel: 'Category', noCategory: 'No category',
        periodLabel: 'Period', weekly: 'Weekly', monthly: 'Monthly', quarterly: 'Quarterly', annual: 'Annual',
        startDateLabel: 'Start date', createBtn: 'Create Budget',
        empty: 'No budgets created', emptyHint: 'Create budgets to control your spending', general: 'General',
        over: 'Limit exceeded!', warn: 'Warning: 80%+', used: '% used', remaining: 'Remaining',
        deleteConfirm: 'Delete budget?',
      },
      goals: {
        title: 'Financial Goals', subtitle: 'Set and track your objectives', newBtn: '+ New Goal',
        modalTitle: 'New Goal', nameLabel: 'Goal name', namePlaceholder: 'e.g. Emergency fund',
        targetLabel: 'Target amount ($)', currentLabel: 'Current amount ($)', deadlineLabel: 'Deadline (optional)', createBtn: 'Create Goal',
        updateTitle: 'Update progress', updateCurrentLabel: 'Current amount ($)', updateBtn: 'Update',
        empty: 'No goals created', emptyHint: 'Set financial goals to track your progress',
        reached: 'Goal reached!', remaining: 'left', deadline: 'Deadline:',
        deleteConfirm: 'Delete goal?', updateAction: 'Update',
      },
      export: {
        btn: 'Export',
        excelLabel: 'Excel (.csv)', excelHint: 'Open in Excel or Sheets',
        pdfLabel: 'PDF', pdfHint: 'Save or print',
        generatedOn: 'Generated on', autoReport: 'MoneyFlow — Auto-generated report',
        noDeadline: 'No deadline', progress: 'Progress',
        status: 'Status', metric: 'Metric', value: 'Value',
        spent: 'Spent',
        done: 'Completed', inProgress: 'In progress', exceeded: 'Exceeded', warning: 'Warning', ok: 'OK',
      },
    },
  },

  fr: {
    login: {
      title: 'Connectez-vous à votre compte',
      subtitle: 'Bon retour !',
      emailPlaceholder: 'votre@email.com',
      passwordLabel: 'Mot de passe',
      submitBtn: 'Se connecter',
      submitting: 'Connexion…',
      noAccount: 'Pas encore de compte ?',
      createAccount: 'Créer un compte gratuit',
      backHome: "← Retour à l'accueil",
    },
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
      { num: '50M CAD+', label: 'Gérés' },
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
        { name: 'FREE', price: '0 CAD', period: '/mois', description: 'Pour démarrer', features: ['1 compte bancaire', '20 transactions/mois', 'Tableau de bord basique', 'Catégories par défaut'], cta: 'Commencer gratuitement', href: '/register', highlighted: false },
        { name: 'TRIAL', price: '14 jours', period: 'gratuit', description: 'Essayez tout', features: ['Tout illimité', 'Tableau de bord complet', 'Rapports automatiques', 'Support prioritaire'], cta: "Démarrer l'essai", href: '/register?plan=trial', highlighted: false },
        { name: 'PRO', price: '19 CAD', period: '/mois', description: 'Pour les utilisateurs sérieux', features: ['Comptes illimités', 'Transactions illimitées', 'KPIs avancés', 'Automatisations', 'Rapports complets', 'Support prioritaire'], cta: "S'abonner PRO", href: '/register?plan=pro', highlighted: true },
      ],
    },
    cta: {
      title: "Commencez à contrôler vos finances aujourd'hui",
      subtitle: '14 jours gratuits, sans carte de crédit, sans engagement.',
      btn: 'Créer un compte gratuit →',
    },
    footer: { copy: '© 2026 MoneyFlow. Tous droits réservés.' },
    dashboard: {
      loading: 'Chargement...',
      cancel: 'Annuler',
      save: 'Enregistrer',
      saving: 'Enregistrement...',
      nav: { dashboard: 'Tableau de bord', transactions: 'Transactions', budgets: 'Budgets', goals: 'Objectifs', logout: 'Déconnexion' },
      home: {
        title: 'Tableau de bord', subtitle: 'Vue d\'ensemble de vos finances',
        totalBalance: 'Solde total', income: 'Revenus (mois)', expenses: 'Dépenses (mois)', cashFlow: 'Flux de trésorerie',
        chartRevExp: 'Revenus vs Dépenses (6 mois)', chartExpCat: 'Dépenses par catégorie', noExpenses: 'Aucune dépense ce mois',
        recentTx: 'Transactions récentes', noTx: 'Aucune transaction ce mois', viewAll: 'Voir tout',
        budgetsTitle: 'Budgets', noBudgets: 'Aucun budget créé', manage: 'Gérer',
        goalsTitle: 'Objectifs financiers',
      },
      transactions: {
        title: 'Transactions', subtitle: 'Gérez vos revenus et dépenses', newBtn: '+ Nouvelle transaction',
        filterAll: 'Toutes', filterIncome: 'Revenus', filterExpense: 'Dépenses',
        modalTitle: 'Nouvelle transaction',
        typeLabel: 'Type', typeIncome: 'Revenu', typeExpense: 'Dépense', typeTransfer: 'Virement',
        amountLabel: 'Montant (CAD)', accountLabel: 'Compte', categoryLabel: 'Catégorie', noCategory: 'Sans catégorie',
        descLabel: 'Description', descPlaceholder: 'Optionnel', dateLabel: 'Date', recurringLabel: 'Récurrent',
        saveBtn: 'Enregistrer', empty: 'Aucune transaction trouvée',
        colDesc: 'Description', colCategory: 'Catégorie', colAccount: 'Compte', colDate: 'Date', colAmount: 'Montant',
        recurringBadge: 'RÉCURRENT', deleteConfirm: 'Supprimer la transaction ?',
      },
      budgets: {
        title: 'Budgets', subtitle: 'Contrôlez vos limites de dépenses', newBtn: '+ Nouveau budget',
        modalTitle: 'Nouveau budget', nameLabel: 'Nom', namePlaceholder: 'Ex: Épicerie du mois',
        limitLabel: 'Limite (CAD)', categoryLabel: 'Catégorie', noCategory: 'Sans catégorie',
        periodLabel: 'Période', weekly: 'Hebdomadaire', monthly: 'Mensuel', quarterly: 'Trimestriel', annual: 'Annuel',
        startDateLabel: 'Date de début', createBtn: 'Créer le budget',
        empty: 'Aucun budget créé', emptyHint: 'Créez des budgets pour contrôler vos dépenses', general: 'Général',
        over: 'Limite dépassée !', warn: 'Attention : 80%+', used: '% utilisé', remaining: 'Restant',
        deleteConfirm: 'Supprimer le budget ?',
      },
      goals: {
        title: 'Objectifs financiers', subtitle: 'Définissez et suivez vos objectifs', newBtn: '+ Nouvel objectif',
        modalTitle: 'Nouvel objectif', nameLabel: "Nom de l'objectif", namePlaceholder: "Ex: Fonds d'urgence",
        targetLabel: 'Montant cible (CAD)', currentLabel: 'Montant actuel (CAD)', deadlineLabel: 'Échéance (optionnel)', createBtn: "Créer l'objectif",
        updateTitle: 'Mettre à jour la progression', updateCurrentLabel: 'Montant actuel (CAD)', updateBtn: 'Mettre à jour',
        empty: 'Aucun objectif créé', emptyHint: 'Définissez des objectifs financiers pour suivre vos progrès',
        reached: 'Objectif atteint !', remaining: 'restant', deadline: 'Échéance :',
        deleteConfirm: "Supprimer l'objectif ?", updateAction: 'Mettre à jour',
      },
      export: {
        btn: 'Exporter',
        excelLabel: 'Excel (.csv)', excelHint: 'Ouvrir dans Excel ou Sheets',
        pdfLabel: 'PDF', pdfHint: 'Enregistrer ou imprimer',
        generatedOn: 'Généré le', autoReport: 'MoneyFlow — Rapport généré automatiquement',
        noDeadline: 'Sans échéance', progress: 'Progression',
        status: 'Statut', metric: 'Indicateur', value: 'Valeur',
        spent: 'Dépensé',
        done: 'Terminé', inProgress: 'En cours', exceeded: 'Dépassé', warning: 'Attention', ok: 'OK',
      },
    },
  },
};
