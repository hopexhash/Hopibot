import { Bell, CircleAlert, CircleCheck, CircleDollarSign, ShieldCheck, TriangleAlert, type LucideIcon } from "lucide-react";

/** Icon and colour per notification kind (shared by the bell menu and the notifications page). */
export const NOTIFICATION_KIND: Record<string, { icon: LucideIcon; color: string; cls: string; label: string }> = {
  info: { icon: Bell, color: "var(--info)", cls: "text-info", label: "Update" },
  success: { icon: CircleCheck, color: "var(--accent)", cls: "text-accent", label: "Done" },
  warning: { icon: TriangleAlert, color: "var(--warning)", cls: "text-warning", label: "Warning" },
  error: { icon: CircleAlert, color: "var(--danger)", cls: "text-danger", label: "Problem" },
  approval: { icon: ShieldCheck, color: "var(--warning)", cls: "text-warning", label: "Needs approval" },
  budget: { icon: CircleDollarSign, color: "var(--warning)", cls: "text-warning", label: "Spending" },
};
