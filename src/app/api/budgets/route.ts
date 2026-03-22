import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const budgets = await prisma.budget.findMany({
    where: { userId: session.user.id },
    include: { category: true },
  });
  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, amount, categoryId, period, startDate } = await req.json();
  const budget = await prisma.budget.create({
    data: {
      userId: session.user.id,
      name,
      amount: parseFloat(amount),
      categoryId: categoryId || null,
      period: period ?? "MONTHLY",
      startDate: new Date(startDate ?? Date.now()),
    },
    include: { category: true },
  });
  return NextResponse.json(budget, { status: 201 });
}
