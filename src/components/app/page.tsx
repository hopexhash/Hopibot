import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  eyebrow?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <div className="hud-label mb-2 text-accent/80">{eyebrow}</div>}
        <h1 className="truncate text-[22px] font-semibold tracking-tight sm:text-[26px]">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[13px] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon,
  className,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  tone?: "accent" | "success" | "warning" | "danger";
}) {
  const toneCls = {
    accent: "bg-accent-soft text-accent",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
  }[tone ?? "accent"];
  const valueCls = { accent: "text-accent glow-text", success: "text-accent glow-text", warning: "text-warning", danger: "text-danger" }[tone ?? "accent"];
  return (
    <div className={cn("panel panel-hover p-4 animate-fade-in", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="hud-label truncate text-[10px]">{label}</p>
        {icon && <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg [&_svg]:size-3.5", toneCls)}>{icon}</div>}
      </div>
      <p className={cn("mono tabular mt-2 text-[22px] font-semibold tracking-tight sm:text-[24px]", valueCls)}>{value}</p>
      {sub && <p className="mt-0.5 truncate text-xs text-muted">{sub}</p>}
    </div>
  );
}

export function Section({ title, description, actions, children, className }: { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("mb-8", className)}>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="mono text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground"><span className="text-accent">›</span> {title}</h2>
          {description && <p className="text-xs text-muted">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
