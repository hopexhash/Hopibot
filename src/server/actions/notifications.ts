"use server";

import { and, eq, isNull } from "drizzle-orm";
import { db, schema } from "../db";
import { action } from "./_util";

/** Marks every unread notification in the workspace as read. */
export async function markNotificationsReadAction() {
  return action({ name: "notifications.read", role: "viewer", revalidate: ["/"] }, async (auth) => {
    await db()
      .update(schema.notifications)
      .set({ readAt: new Date() })
      .where(and(eq(schema.notifications.organizationId, auth.org.id), isNull(schema.notifications.readAt)));
    return null;
  });
}
