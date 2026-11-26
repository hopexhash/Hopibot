"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, X } from "lucide-react";
import { Dialog as RDialog, DropdownMenu as RDropdown, Slot, Switch as RSwitch, Tabs as RTabs, Tooltip as RTooltip } from "radix-ui";
import * as React from "react";
import { cn } from "@/lib/utils";

// ───────────────────────── Button ─────────────────────────

export const buttonVariants = cva(
  "btn-m inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[13.5px] font-medium disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "btn-lift bg-accent font-semibold text-accent-foreground shadow-[0_0_18px_-4px_rgba(0,255,120,0.55)] hover:bg-accent-hover hover:shadow-[0_0_24px_-2px_rgba(0,255,120,0.7)]",
        secondary: "border border-border bg-surface-2 text-foreground hover:bg-surface-3 hover:border-border-strong hover:text-accent",
        ghost: "text-muted hover:bg-accent-soft hover:text-accent",
        danger: "btn-lift bg-danger font-semibold text-white shadow-[0_0_16px_-4px_rgba(255,77,97,0.6)] hover:opacity-90",
        "danger-ghost": "text-danger hover:bg-danger-soft",
        success: "btn-lift bg-accent font-semibold text-accent-foreground shadow-[0_0_18px_-4px_rgba(0,255,120,0.55)] hover:bg-accent-hover",
      },
      size: { sm: "h-9 px-3 text-[12.5px]", md: "h-10 px-4", lg: "h-12 px-5 text-[14.5px]", icon: "h-10 w-10", "icon-sm": "h-9 w-9" },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild, loading, children, disabled, ...props },
  ref,
) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} {...props}>
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Loader2 className="animate-spin" />}
          {children}
        </>
      )}
    </Comp>
  );
});

// ───────────────────────── Card ─────────────────────────

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("panel", className)} {...props} />;
}
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-start justify-between gap-3 px-5 pt-4 pb-3", className)} {...props} />;
}
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-[14px] font-semibold tracking-tight text-foreground", className)} {...props} />;
}
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-0.5 text-[12.5px] text-muted", className)} {...props} />;
}
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

// ───────────────────────── Badge ─────────────────────────

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11.5px] font-medium leading-[18px] whitespace-nowrap [&_svg]:size-3",
  {
    variants: {
      tone: {
        neutral: "bg-surface-3 text-muted",
        accent: "bg-accent-soft text-accent",
        success: "bg-success-soft text-success",
        warning: "bg-warning-soft text-warning",
        danger: "bg-danger-soft text-danger",
        info: "bg-info-soft text-info",
        outline: "border border-border text-muted",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);
export function Badge({ className, tone, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export function MockBadge({ className }: { className?: string }) {
  return (
    <Badge tone="warning" className={cn("font-semibold tracking-wide", className)} title="Generated in development mock mode — not real data">
      MOCK
    </Badge>
  );
}

// ───────────────────────── Form controls ─────────────────────────

const fieldBase =
  "w-full rounded-xl border border-border-strong bg-[#050d09] px-3.5 text-[16px] text-foreground placeholder:text-subtle field-m focus:border-accent focus:outline-none focus:ring-3 focus:ring-[var(--ring)] disabled:opacity-60 sm:text-[13.5px]";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={cn(fieldBase, "h-11 sm:h-10", className)} {...props} />;
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(fieldBase, "min-h-20 py-2 leading-relaxed", className)} {...props} />;
  },
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        fieldBase,
        "h-11 appearance-none sm:h-10 bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9aa5' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[length:12px] bg-[right_10px_center] bg-no-repeat pr-8",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1.5 block text-[13px] font-medium text-foreground", className)} {...props} />;
}

export function Field({
  label,
  hint,
  error,
  children,
  className,
  htmlFor,
}: {
  label: string;
  hint?: React.ReactNode;
  error?: string | null;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p role="alert" className="field-error mt-1.5 text-[12.5px] text-danger">{error}</p> : hint ? <p className="mt-1.5 text-[12.5px] leading-snug text-muted">{hint}</p> : null}
    </div>
  );
}

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  label,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <RSwitch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={label}
      className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-border-strong bg-surface-3 transition-colors data-[state=checked]:border-accent data-[state=checked]:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RSwitch.Thumb className="block h-5 w-5 translate-x-[3px] rounded-full bg-[#b9c9bf] shadow transition-transform data-[state=checked]:translate-x-[23px] data-[state=checked]:bg-accent-foreground" />
    </RSwitch.Root>
  );
}

// ───────────────────────── Dialog ─────────────────────────

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const width = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" }[size];
  return (
    <RDialog.Root open={open} onOpenChange={onOpenChange}>
      <RDialog.Portal>
        <RDialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
        <RDialog.Content
          className={cn(
            // Phones: a bottom sheet (thumb-reachable, keyboard-safe). Larger screens: centred modal.
            "modal-m fixed z-50 flex flex-col border border-border-strong bg-[#06100b] shadow-[0_0_60px_-12px_rgba(0,255,120,0.3)] data-[state=closed]:animate-modal-out data-[state=open]:animate-modal-in",
            "inset-x-0 bottom-0 max-h-[92dvh] w-full rounded-t-3xl pb-[var(--safe-bottom)]",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[85dvh] sm:w-[calc(100vw-3rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:pb-0",
            width,
          )}
        >
          <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-border-strong sm:hidden" aria-hidden />
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
            <div className="min-w-0">
              <RDialog.Title className="text-[16px] font-semibold tracking-tight text-foreground">{title}</RDialog.Title>
              {description ? (
                <RDialog.Description className="mt-1 text-[13px] leading-relaxed text-muted">{description}</RDialog.Description>
              ) : (
                <RDialog.Description className="sr-only">{title}</RDialog.Description>
              )}
            </div>
            <RDialog.Close asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Close">
                <X />
              </Button>
            </RDialog.Close>
          </div>
          <div className="overflow-y-auto px-5 py-4">{children}</div>
          {footer && <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-3 sm:flex-row sm:justify-end [&>button]:h-11 sm:[&>button]:h-10">{footer}</div>}
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}

// ───────────────────────── Dropdown ─────────────────────────

export const DropdownMenu = RDropdown.Root;
export const DropdownTrigger = RDropdown.Trigger;
export function DropdownContent({ className, align = "end", ...props }: React.ComponentProps<typeof RDropdown.Content>) {
  return (
    <RDropdown.Portal>
      <RDropdown.Content
        align={align}
        sideOffset={6}
        className={cn(
          "z-50 min-w-44 rounded-xl border border-border-strong bg-[#08100c] p-1 shadow-[0_0_40px_-10px_rgba(0,255,120,0.3)] origin-[var(--radix-dropdown-menu-content-transform-origin)] data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in",
          className,
        )}
        {...props}
      />
    </RDropdown.Portal>
  );
}
export function DropdownItem({ className, destructive, ...props }: React.ComponentProps<typeof RDropdown.Item> & { destructive?: boolean }) {
  return (
    <RDropdown.Item
      className={cn(
        "flex min-h-10 cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] outline-none data-[highlighted]:bg-accent-soft data-[highlighted]:text-accent data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:text-muted",
        destructive && "text-danger [&_svg]:text-danger",
        className,
      )}
      {...props}
    />
  );
}
export const DropdownSeparator = () => <RDropdown.Separator className="my-1 h-px bg-border" />;

// ───────────────────────── Tabs ─────────────────────────

export const Tabs = RTabs.Root;
export function TabsList({ className, ...props }: React.ComponentProps<typeof RTabs.List>) {
  return <RTabs.List className={cn("flex gap-1 overflow-x-auto border-b border-border", className)} {...props} />;
}
export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof RTabs.Trigger>) {
  return (
    <RTabs.Trigger
      className={cn(
        "tab-m -mb-px flex h-11 items-center whitespace-nowrap px-3 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground data-[state=active]:text-accent",
        className,
      )}
      {...props}
    />
  );
}
export function TabsContent({ className, ...props }: React.ComponentProps<typeof RTabs.Content>) {
  return <RTabs.Content className={cn("pt-5 outline-none data-[state=active]:animate-fade-in", className)} {...props} />;
}

// ───────────────────────── Tooltip ─────────────────────────

export function Tooltip({ content, children, side }: { content: React.ReactNode; children: React.ReactNode; side?: "top" | "right" | "bottom" | "left" }) {
  return (
    <RTooltip.Provider delayDuration={250}>
      <RTooltip.Root>
        <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content
            side={side}
            sideOffset={8}
            className="z-50 max-w-xs rounded-lg border border-border-strong bg-[#08100c] px-2.5 py-1.5 text-xs text-foreground shadow-lg origin-[var(--radix-tooltip-content-transform-origin)] data-[state=closed]:animate-pop-out data-[state=delayed-open]:animate-pop-in data-[state=instant-open]:animate-pop-in"
          >
            {content}
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
}

// ───────────────────────── Misc ─────────────────────────

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} aria-hidden />;
}

/** `active` marks work that is under way right now (a slow sheen runs along the bar); measures such as budgets stay still. */
export function Progress({ value, className, tone = "accent", active }: { value: number; className?: string; tone?: "accent" | "success" | "warning" | "danger"; active?: boolean }) {
  const color = { accent: "bg-accent", success: "bg-success", warning: "bg-warning", danger: "bg-danger" }[tone];
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-3", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn("progress-fill h-full rounded-full", color, tone === "accent" && "shadow-[0_0_10px_#00ff78]")} data-active={active === true} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex animate-fade-in flex-col items-center justify-center px-6 py-14 text-center", className)}>
      {icon && <div className="mb-4 flex h-12 w-12 animate-float-soft items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent [&_svg]:size-5">{icon}</div>}
      <p className="text-[15px] font-semibold">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** A check mark that draws itself. Use it where something has really just completed. */
export function CheckDraw({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("check-draw", className)} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
    </svg>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-muted">{children}</kbd>;
}

export function ScoreRing({ score, size = 36 }: { score: number | null | undefined; size?: number }) {
  const v = score ?? 0;
  const r = (size - 5) / 2;
  const c = 2 * Math.PI * r;
  const color = score == null ? "var(--subtle)" : v >= 75 ? "var(--success)" : v >= 50 ? "var(--warning)" : "var(--danger)";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} aria-label={`Score ${score ?? "n/a"}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-3)" strokeWidth={3} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={3}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c - (c * v) / 100}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span className="mono tabular absolute text-[11px] font-semibold">{score ?? "–"}</span>
    </div>
  );
}


// ───────────────────────── Confirm & help ─────────────────────────

/** Confirmation for actions that stop work or cannot be undone. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  tone = "danger",
  loading,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  tone?: "danger" | "primary";
  loading?: boolean;
  onConfirm: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant={tone} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}

/** Small "?" that explains a term in plain language (tap on phones, hover on desktop). */
export function HelpTip({ children, label = "What is this?" }: { children: React.ReactNode; label?: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <RTooltip.Provider delayDuration={150}>
      <RTooltip.Root open={open} onOpenChange={setOpen}>
        <RTooltip.Trigger asChild>
          <button
            type="button"
            aria-label={label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen((o) => !o);
            }}
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border-strong text-[10px] font-semibold leading-none text-muted transition-colors hover:border-accent hover:text-accent"
          >
            ?
          </button>
        </RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content sideOffset={6} collisionPadding={12} className="z-[80] max-w-[260px] rounded-xl border border-border-strong bg-[#06100b] px-3 py-2 text-[12.5px] leading-relaxed text-foreground shadow-[0_0_30px_-10px_rgba(0,255,120,0.4)] data-[state=delayed-open]:animate-fade-in data-[state=instant-open]:animate-fade-in">
            {children}
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
}
