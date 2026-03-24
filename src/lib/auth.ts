import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

function daysAgo(months: number, day: number) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  d.setDate(day);
  d.setHours(12, 0, 0, 0);
  return d;
}

async function createBaseUser(data: { name: string; email: string; password?: string; googleId?: string; plan: string }) {
  const user = await prisma.user.create({
    data: {
      ...data,
      trialEndsAt: data.plan === "TRIAL" ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) : null,
    },
  });

  // Create accounts
  const conta = await prisma.account.create({
    data: { userId: user.id, name: "Conta Corrente", type: "CHECKING", balance: 8540.5, color: "#2563EB" },
  });
  await prisma.account.create({
    data: { userId: user.id, name: "Poupança", type: "SAVINGS", balance: 15000.0, color: "#22c55e" },
  });

  // Create categories
  const defaultCategories = [
    { name: "Salário", type: "INCOME", color: "#22c55e", icon: "💰" },
    { name: "Freelance", type: "INCOME", color: "#10b981", icon: "💻" },
    { name: "Investimentos", type: "INCOME", color: "#0ea5e9", icon: "📈" },
    { name: "Alimentação", type: "EXPENSE", color: "#f59e0b", icon: "🍔" },
    { name: "Transporte", type: "EXPENSE", color: "#6366f1", icon: "🚗" },
    { name: "Moradia", type: "EXPENSE", color: "#ec4899", icon: "🏠" },
    { name: "Saúde", type: "EXPENSE", color: "#ef4444", icon: "🏥" },
    { name: "Lazer", type: "EXPENSE", color: "#8b5cf6", icon: "🎮" },
    { name: "Educação", type: "EXPENSE", color: "#0ea5e9", icon: "📚" },
  ];
  const cats = await prisma.$transaction(
    defaultCategories.map((c) => prisma.category.create({ data: { ...c, userId: user.id } }))
  );
  const catId = (name: string) => cats.find((c) => c.name === name)!.id;

  // Sample transactions – last 6 months
  const incomes = [6500, 6500, 7200, 6500, 6500, 6500];
  const freelances = [0, 1200, 0, 800, 2500, 1800];
  const txData = [];
  for (let m = 5; m >= 0; m--) {
    const idx = 5 - m;
    txData.push({ userId: user.id, accountId: conta.id, categoryId: catId("Salário"), amount: incomes[idx], type: "INCOME", description: "Salário mensal", date: daysAgo(m, 5), recurring: true });
    if (freelances[idx] > 0) txData.push({ userId: user.id, accountId: conta.id, categoryId: catId("Freelance"), amount: freelances[idx], type: "INCOME", description: "Projeto freelance", date: daysAgo(m, 20), recurring: false });
    const expenses = [
      { cat: "Moradia", amount: 1800, desc: "Aluguel", day: 10 },
      { cat: "Alimentação", amount: 320 + idx * 15, desc: "Supermercado", day: 7 },
      { cat: "Alimentação", amount: 180, desc: "Restaurantes", day: 18 },
      { cat: "Transporte", amount: 220, desc: "Combustível", day: 12 },
      { cat: "Saúde", amount: 150, desc: "Plano de saúde", day: 15 },
      { cat: "Lazer", amount: 90, desc: "Streaming", day: 3 },
      { cat: "Educação", amount: 350, desc: "Curso online", day: 22 },
    ];
    for (const e of expenses) txData.push({ userId: user.id, accountId: conta.id, categoryId: catId(e.cat), amount: e.amount, type: "EXPENSE", description: e.desc, date: daysAgo(m, e.day), recurring: false });
    if (idx % 2 === 0) txData.push({ userId: user.id, accountId: conta.id, categoryId: catId("Lazer"), amount: 250 + idx * 30, type: "EXPENSE", description: "Lazer / passeio", date: daysAgo(m, 25), recurring: false });
  }
  await prisma.transaction.createMany({ data: txData });

  // Budgets
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const budgets = [
    { name: "Alimentação", cat: "Alimentação", amount: 600, spent: 500 },
    { name: "Transporte", cat: "Transporte", amount: 300, spent: 220 },
    { name: "Lazer", cat: "Lazer", amount: 200, spent: 90 },
    { name: "Saúde", cat: "Saúde", amount: 200, spent: 150 },
    { name: "Educação", cat: "Educação", amount: 400, spent: 350 },
  ];
  await prisma.budget.createMany({
    data: budgets.map((b) => ({ userId: user.id, categoryId: catId(b.cat), name: b.name, amount: b.amount, spent: b.spent, period: "MONTHLY", startDate: startOfMonth })),
  });

  // Goals
  await prisma.goal.createMany({
    data: [
      { userId: user.id, name: "Reserva de emergência", targetAmount: 30000, currentAmount: 15000, deadline: new Date("2026-12-31") },
      { userId: user.id, name: "Viagem para Europa", targetAmount: 12000, currentAmount: 4800, deadline: new Date("2027-06-01") },
      { userId: user.id, name: "Novo notebook", targetAmount: 5000, currentAmount: 3750, deadline: new Date("2026-08-01") },
      { userId: user.id, name: "Apartamento próprio", targetAmount: 80000, currentAmount: 22000, deadline: null },
    ],
  });

  return user;
}

export async function createUser(name: string, email: string, password: string, plan = "TRIAL") {
  const hashed = await bcrypt.hash(password, 12);
  return createBaseUser({ name, email, password: hashed, plan });
}

export async function findOrCreateGoogleUser(googleId: string, email: string, name: string, plan = "TRIAL") {
  const byGoogle = await prisma.user.findUnique({ where: { googleId } });
  if (byGoogle) return byGoogle;

  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    return prisma.user.update({ where: { id: byEmail.id }, data: { googleId } });
  }

  return createBaseUser({ name, email, googleId, plan });
}

export async function validateUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user || !user.password) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return user;
}

export function canAddTransaction(plan: string, transactionCount: number) {
  if (plan === "FREE" && transactionCount >= 20) return false;
  return true;
}

export function canAddAccount(plan: string, accountCount: number) {
  if (plan === "FREE" && accountCount >= 1) return false;
  return true;
}
