"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../db";
import { action, UserError } from "./_util";

const EXPENSE_CATEGORIES = ["hosting", "email", "software", "contractor", "other"] as const;

const expenseSchema = z.object({
  category: z.enum(EXPENSE_CATEGORIES),
  description: z.string().trim().min(2, "Describe the expense").max(200),
  amountEur: z.number().positive("Enter an amount above zero").max(1_000_000),
  incurredOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
});

/** Records an operating expense by hand (hosting, tools, freelancers). API usage is metered separately. */
export async function addExpenseAction(input: unknown) {
  return action({ name: "expense.add", role: "admin", revalidate: ["/revenue", "/analytics", "/command"], auditTarget: (r: { id: string }) => ({ type: "expense", id: r.id }) }, async (auth) => {
    const e = expenseSchema.parse(input);
    const date = new Date(`${e.incurredOn}T12:00:00Z`);
    if (date.getTime() > Date.now() + 86_400_000) throw new UserError("The date is in the future.");
    const [row] = await db()
      .insert(schema.expenses)
      .values({ organizationId: auth.org.id, category: e.category, description: e.description, amountCents: Math.round(e.amountEur * 100), incurredOn: date, createdBy: auth.user.id })
      .returning({ id: schema.expenses.id });
    return { id: row.id };
  });
}

export async function deleteExpenseAction(id: string) {
  return action({ name: "expense.delete", role: "admin", revalidate: ["/revenue", "/analytics", "/command"], auditTarget: () => ({ type: "expense", id }) }, async (auth) => {
    await db().delete(schema.expenses).where(and(eq(schema.expenses.id, z.string().uuid().parse(id)), eq(schema.expenses.organizationId, auth.org.id)));
    return null;
  });
}
