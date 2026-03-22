import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { canAddTransaction } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const accountId = searchParams.get("accountId");
  const categoryId = searchParams.get("categoryId");

  const where: Record<string, unknown> = { userId: session.user.id };
  if (type) where.type = type;
  if (accountId) where.accountId = accountId;
  if (categoryId) where.categoryId = categoryId;

  const transactions = await prisma.transaction.findMany({
    where,
    include: { category: true, account: true },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const plan = session.user.plan;

  // Check plan limits
  const count = await prisma.transaction.count({ where: { userId } });
  if (!canAddTransaction(plan, count))
    return NextResponse.json({ error: "Limite do plano FREE atingido (20 transações). Faça upgrade para PRO." }, { status: 403 });

  const { accountId, categoryId, amount, type, description, date, recurring } = await req.json();
  if (!accountId || !amount || !type || !date)
    return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      accountId,
      categoryId: categoryId || null,
      amount: parseFloat(amount),
      type,
      description,
      date: new Date(date),
      recurring: recurring ?? false,
    },
    include: { category: true, account: true },
  });

  // Update account balance
  const delta = type === "INCOME" ? transaction.amount : -transaction.amount;
  await prisma.account.update({
    where: { id: accountId },
    data: { balance: { increment: delta } },
  });

  // Check budgets
  if (type === "EXPENSE" && categoryId) {
    const budget = await prisma.budget.findFirst({ where: { userId, categoryId } });
    if (budget) {
      const newSpent = budget.spent + transaction.amount;
      await prisma.budget.update({ where: { id: budget.id }, data: { spent: newSpent } });
      if (newSpent >= budget.amount) {
        await prisma.notification.create({
          data: { userId, type: "BUDGET_EXCEEDED", message: `Orçamento "${budget.name}" ultrapassado!` },
        });
      } else if (newSpent >= budget.amount * 0.8) {
        await prisma.notification.create({
          data: { userId, type: "BUDGET_WARNING", message: `Orçamento "${budget.name}" está em 80%.` },
        });
      }
    }
  }

  return NextResponse.json(transaction, { status: 201 });
}
