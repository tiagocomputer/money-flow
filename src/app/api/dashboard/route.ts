import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getMonthRange } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { start, end } = getMonthRange();

  const [accounts, transactions, budgets, goals, notifications] = await Promise.all([
    prisma.account.findMany({ where: { userId } }),
    prisma.transaction.findMany({
      where: { userId, date: { gte: start, lte: end } },
      include: { category: true },
      orderBy: { date: "desc" },
    }),
    prisma.budget.findMany({ where: { userId }, include: { category: true } }),
    prisma.goal.findMany({ where: { userId } }),
    prisma.notification.findMany({ where: { userId, read: false }, orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const income = transactions.filter((t) => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0);
  const cashFlow = income - expenses;

  // Monthly chart data (last 6 months)
  const chartData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const { start: s, end: e } = getMonthRange(d);
    const monthTx = await prisma.transaction.findMany({ where: { userId, date: { gte: s, lte: e } } });
    const inc = monthTx.filter((t) => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0);
    const exp = monthTx.filter((t) => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0);
    chartData.push({
      month: d.toLocaleString("pt-BR", { month: "short" }),
      receitas: inc,
      despesas: exp,
    });
  }

  // Expense by category
  const expenseByCategory: Record<string, number> = {};
  transactions.filter((t) => t.type === "EXPENSE").forEach((t) => {
    const key = t.category?.name ?? "Outros";
    expenseByCategory[key] = (expenseByCategory[key] ?? 0) + t.amount;
  });
  const categoryChart = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

  return NextResponse.json({
    totalBalance,
    income,
    expenses,
    cashFlow,
    accounts,
    recentTransactions: transactions.slice(0, 5),
    budgets,
    goals,
    notifications,
    chartData,
    categoryChart,
  });
}
