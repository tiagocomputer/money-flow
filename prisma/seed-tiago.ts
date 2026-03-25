import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import "dotenv/config";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter } as never);

function monthsAgo(months: number, day = 15) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  d.setDate(day);
  d.setHours(12, 0, 0, 0);
  return d;
}

async function main() {
  const EMAIL = "tiagocomputer1@gmail.com";

  // Find or create user
  let user = await prisma.user.findUnique({ where: { email: EMAIL } });

  if (user) {
    console.log("✅ Usuário encontrado, limpando dados antigos...");
    await prisma.transaction.deleteMany({ where: { userId: user.id } });
    await prisma.budget.deleteMany({ where: { userId: user.id } });
    await prisma.goal.deleteMany({ where: { userId: user.id } });
    await prisma.account.deleteMany({ where: { userId: user.id } });
    await prisma.category.deleteMany({ where: { userId: user.id } });
    await prisma.user.update({ where: { id: user.id }, data: { plan: "PRO", name: user.name ?? "Tiago" } });
  } else {
    console.log("✅ Criando usuário tiagocomputer1@gmail.com...");
    user = await prisma.user.create({
      data: { name: "Tiago", email: EMAIL, plan: "PRO" },
    });
  }

  // Accounts
  const conta = await prisma.account.create({
    data: { userId: user.id, name: "Conta Corrente", type: "CHECKING", balance: 9240.5, color: "#2563EB" },
  });
  const poupanca = await prisma.account.create({
    data: { userId: user.id, name: "Poupança", type: "SAVINGS", balance: 18500.0, color: "#22c55e" },
  });

  // Categories
  const cats = await prisma.category.createManyAndReturn({
    data: [
      { userId: user.id, name: "Salário",        type: "INCOME",  color: "#22c55e", icon: "💰" },
      { userId: user.id, name: "Freelance",       type: "INCOME",  color: "#10b981", icon: "💻" },
      { userId: user.id, name: "Investimentos",   type: "INCOME",  color: "#0ea5e9", icon: "📈" },
      { userId: user.id, name: "Alimentação",     type: "EXPENSE", color: "#f59e0b", icon: "🍔" },
      { userId: user.id, name: "Transporte",      type: "EXPENSE", color: "#6366f1", icon: "🚗" },
      { userId: user.id, name: "Moradia",         type: "EXPENSE", color: "#ec4899", icon: "🏠" },
      { userId: user.id, name: "Saúde",           type: "EXPENSE", color: "#ef4444", icon: "🏥" },
      { userId: user.id, name: "Lazer",           type: "EXPENSE", color: "#8b5cf6", icon: "🎮" },
      { userId: user.id, name: "Educação",        type: "EXPENSE", color: "#0ea5e9", icon: "📚" },
    ],
  });

  const catMap: Record<string, string> = {};
  for (const c of cats) catMap[c.name] = c.id;

  // Transactions – last 6 months
  const txData: Array<{
    userId: string; accountId: string; categoryId: string;
    amount: number; type: string; description: string; date: Date; recurring: boolean;
  }> = [];

  const incomePerMonth    = [7500, 7500, 8200, 7500, 7500, 7500];
  const freelancePerMonth = [0, 1500, 0, 900, 3000, 2200];
  const investPerMonth    = [150, 165, 140, 175, 190, 210];

  for (let m = 5; m >= 0; m--) {
    const idx = 5 - m;

    txData.push({ userId: user.id, accountId: conta.id, categoryId: catMap["Salário"], amount: incomePerMonth[idx], type: "INCOME", description: "Salário mensal", date: monthsAgo(m, 5), recurring: true });

    if (freelancePerMonth[idx] > 0) {
      txData.push({ userId: user.id, accountId: conta.id, categoryId: catMap["Freelance"], amount: freelancePerMonth[idx], type: "INCOME", description: "Projeto freelance", date: monthsAgo(m, 20), recurring: false });
    }

    txData.push({ userId: user.id, accountId: poupanca.id, categoryId: catMap["Investimentos"], amount: investPerMonth[idx], type: "INCOME", description: "Rendimento poupança", date: monthsAgo(m, 1), recurring: true });

    const expenses = [
      { cat: "Moradia",      amount: 2100, desc: "Aluguel",              day: 10, recurring: true  },
      { cat: "Alimentação",  amount: 380,  desc: "Supermercado",         day: 7,  recurring: false },
      { cat: "Alimentação",  amount: 200,  desc: "Restaurantes",         day: 18, recurring: false },
      { cat: "Transporte",   amount: 260,  desc: "Combustível e pedágio",day: 12, recurring: false },
      { cat: "Saúde",        amount: 180,  desc: "Plano de saúde",       day: 15, recurring: true  },
      { cat: "Lazer",        amount: 110,  desc: "Streaming e assinaturas",day: 3,recurring: true  },
      { cat: "Educação",     amount: 420,  desc: "Curso online",         day: 22, recurring: true  },
    ];

    for (const e of expenses) {
      const amount = Math.round((e.amount + Math.sin(m * 7 + e.day) * e.amount * 0.1) * 100) / 100;
      txData.push({ userId: user.id, accountId: conta.id, categoryId: catMap[e.cat], amount, type: "EXPENSE", description: e.desc, date: monthsAgo(m, e.day), recurring: e.recurring });
    }

    if (idx % 2 === 0) {
      txData.push({ userId: user.id, accountId: conta.id, categoryId: catMap["Lazer"], amount: 300 + idx * 40, type: "EXPENSE", description: "Viagem / passeio", date: monthsAgo(m, 25), recurring: false });
    }

    if (idx === 2) {
      txData.push({ userId: user.id, accountId: conta.id, categoryId: catMap["Saúde"], amount: 480, type: "EXPENSE", description: "Consulta especialista", date: monthsAgo(m, 17), recurring: false });
    }
  }

  await prisma.transaction.createMany({ data: txData });

  // Budgets (current month)
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const budgetsData = [
    { name: "Alimentação", catName: "Alimentação", amount: 700,  spent: 580   },
    { name: "Transporte",  catName: "Transporte",  amount: 350,  spent: 260   },
    { name: "Lazer",       catName: "Lazer",       amount: 250,  spent: 110   },
    { name: "Saúde",       catName: "Saúde",       amount: 250,  spent: 180   },
    { name: "Educação",    catName: "Educação",    amount: 500,  spent: 420   },
  ];

  for (const b of budgetsData) {
    await prisma.budget.create({
      data: { userId: user.id, categoryId: catMap[b.catName], name: b.name, amount: b.amount, spent: b.spent, period: "MONTHLY", startDate: startOfMonth },
    });
  }

  // Goals
  const goalsData = [
    { name: "Reserva de emergência", targetAmount: 36000, currentAmount: 18500, deadline: new Date("2026-12-31") },
    { name: "Viagem para Europa",    targetAmount: 15000, currentAmount: 6200,  deadline: new Date("2027-06-01") },
    { name: "Novo notebook",         targetAmount: 6000,  currentAmount: 4500,  deadline: new Date("2026-08-01") },
    { name: "Apartamento próprio",   targetAmount: 100000,currentAmount: 28000, deadline: null },
  ];

  for (const g of goalsData) {
    await prisma.goal.create({ data: { userId: user.id, ...g } });
  }

  console.log("\n✅ Dados populados com sucesso para tiagocomputer1@gmail.com!");
  console.log("   Conta Corrente: R$ 9.240,50");
  console.log("   Poupança:       R$ 18.500,00");
  console.log("   Transações:    ", txData.length, "registros (6 meses)");
  console.log("   Orçamentos:    ", budgetsData.length, "categorias");
  console.log("   Metas:         ", goalsData.length, "objetivos");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
