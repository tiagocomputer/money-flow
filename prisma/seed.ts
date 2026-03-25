import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

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
  // Remove existing demo user if present
  await prisma.user.deleteMany({ where: { email: "demo@moneyflow.com" } });

  const hashed = await bcrypt.hash("demo123", 12);
  const user = await prisma.user.create({
    data: {
      name: "Maria Silva",
      email: "demo@moneyflow.com",
      password: hashed,
      plan: "PRO",
    },
  });

  // Accounts
  const conta = await prisma.account.create({
    data: {
      userId: user.id,
      name: "Conta Corrente",
      type: "CHECKING",
      balance: 8540.5,
      color: "#2563EB",
    },
  });

  const poupanca = await prisma.account.create({
    data: {
      userId: user.id,
      name: "Poupança",
      type: "SAVINGS",
      balance: 15000.0,
      color: "#22c55e",
    },
  });

  // Categories
  const cats = await prisma.category.createManyAndReturn({
    data: [
      { userId: user.id, name: "Salário", type: "INCOME", color: "#22c55e", icon: "💰" },
      { userId: user.id, name: "Freelance", type: "INCOME", color: "#10b981", icon: "💻" },
      { userId: user.id, name: "Investimentos", type: "INCOME", color: "#0ea5e9", icon: "📈" },
      { userId: user.id, name: "Alimentação", type: "EXPENSE", color: "#f59e0b", icon: "🍔" },
      { userId: user.id, name: "Transporte", type: "EXPENSE", color: "#6366f1", icon: "🚗" },
      { userId: user.id, name: "Moradia", type: "EXPENSE", color: "#ec4899", icon: "🏠" },
      { userId: user.id, name: "Saúde", type: "EXPENSE", color: "#ef4444", icon: "🏥" },
      { userId: user.id, name: "Lazer", type: "EXPENSE", color: "#8b5cf6", icon: "🎮" },
      { userId: user.id, name: "Educação", type: "EXPENSE", color: "#0ea5e9", icon: "📚" },
    ],
  });

  const catMap: Record<string, string> = {};
  for (const c of cats) catMap[c.name] = c.id;

  // Transactions – last 6 months
  const txData: Array<{
    userId: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: string;
    description: string;
    date: Date;
    recurring: boolean;
  }> = [];

  const incomePerMonth = [6500, 6500, 7200, 6500, 6500, 6500];
  const freelancePerMonth = [0, 1200, 0, 800, 2500, 1800];
  const investPerMonth = [120, 135, 110, 145, 160, 180];

  for (let m = 5; m >= 0; m--) {
    const idx = 5 - m;

    // Salary
    txData.push({
      userId: user.id,
      accountId: conta.id,
      categoryId: catMap["Salário"],
      amount: incomePerMonth[idx],
      type: "INCOME",
      description: "Salário mensal",
      date: monthsAgo(m, 5),
      recurring: true,
    });

    // Freelance
    if (freelancePerMonth[idx] > 0) {
      txData.push({
        userId: user.id,
        accountId: conta.id,
        categoryId: catMap["Freelance"],
        amount: freelancePerMonth[idx],
        type: "INCOME",
        description: "Projeto freelance",
        date: monthsAgo(m, 20),
        recurring: false,
      });
    }

    // Investments return
    txData.push({
      userId: user.id,
      accountId: poupanca.id,
      categoryId: catMap["Investimentos"],
      amount: investPerMonth[idx],
      type: "INCOME",
      description: "Rendimento poupança",
      date: monthsAgo(m, 1),
      recurring: true,
    });

    // Expenses
    const expenses = [
      { cat: "Moradia", amount: 1800, desc: "Aluguel", day: 10, recurring: true },
      { cat: "Alimentação", amount: 320, desc: "Supermercado", day: 7, recurring: false },
      { cat: "Alimentação", amount: 180, desc: "Restaurantes", day: 18, recurring: false },
      { cat: "Transporte", amount: 220, desc: "Combustível e pedágio", day: 12, recurring: false },
      { cat: "Saúde", amount: 150, desc: "Plano de saúde", day: 15, recurring: true },
      { cat: "Lazer", amount: 90, desc: "Streaming e assinaturas", day: 3, recurring: true },
      { cat: "Educação", amount: 350, desc: "Curso online", day: 22, recurring: true },
    ];

    for (const e of expenses) {
      let amount = e.amount;
      // add small variation
      amount += (Math.sin(m * 7 + e.day) * e.amount * 0.1);
      amount = Math.round(amount * 100) / 100;

      txData.push({
        userId: user.id,
        accountId: conta.id,
        categoryId: catMap[e.cat],
        amount,
        type: "EXPENSE",
        description: e.desc,
        date: monthsAgo(m, e.day),
        recurring: e.recurring,
      });
    }

    // Extra expense some months
    if (idx % 2 === 0) {
      txData.push({
        userId: user.id,
        accountId: conta.id,
        categoryId: catMap["Lazer"],
        amount: 250 + idx * 30,
        type: "EXPENSE",
        description: "Viagem / passeio",
        date: monthsAgo(m, 25),
        recurring: false,
      });
    }

    // Health extra one month
    if (idx === 2) {
      txData.push({
        userId: user.id,
        accountId: conta.id,
        categoryId: catMap["Saúde"],
        amount: 430,
        type: "EXPENSE",
        description: "Consulta especialista",
        date: monthsAgo(m, 17),
        recurring: false,
      });
    }
  }

  await prisma.transaction.createMany({ data: txData });

  // Budgets (current month)
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const budgetsData = [
    { name: "Alimentação", catName: "Alimentação", amount: 600, spent: 498.5 },
    { name: "Transporte", catName: "Transporte", amount: 300, spent: 220 },
    { name: "Lazer", catName: "Lazer", amount: 200, spent: 90 },
    { name: "Saúde", catName: "Saúde", amount: 200, spent: 150 },
    { name: "Educação", catName: "Educação", amount: 400, spent: 350 },
  ];

  for (const b of budgetsData) {
    await prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: catMap[b.catName],
        name: b.name,
        amount: b.amount,
        spent: b.spent,
        period: "MONTHLY",
        startDate: startOfMonth,
      },
    });
  }

  // Goals
  const goalsData = [
    { name: "Reserva de emergência", targetAmount: 30000, currentAmount: 15000, deadline: new Date("2026-12-31") },
    { name: "Viagem para Europa", targetAmount: 12000, currentAmount: 4800, deadline: new Date("2027-06-01") },
    { name: "Novo notebook", targetAmount: 5000, currentAmount: 3750, deadline: new Date("2026-08-01") },
    { name: "Apartamento próprio", targetAmount: 80000, currentAmount: 22000, deadline: null },
  ];

  for (const g of goalsData) {
    await prisma.goal.create({
      data: { userId: user.id, ...g },
    });
  }

  console.log("✅ Seed concluído!");
  console.log("   Email: demo@moneyflow.com");
  console.log("   Senha: demo123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
