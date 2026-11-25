import { cn } from "@/lib/utils";

export function Table({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border bg-surface shadow-[var(--shadow-sm)]", className)}>
      <table className="w-full min-w-[640px] border-collapse text-[13px]">{children}</table>
    </div>
  );
}
export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-border bg-surface-2/60 text-left text-[11px] font-medium uppercase tracking-wide text-muted">{children}</thead>;
}
export function TH({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("whitespace-nowrap px-4 py-2.5 font-medium", className)} {...props}>
      {children}
    </th>
  );
}
export function TR({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("border-b border-border last:border-0 transition-colors hover:bg-surface-2/60", className)} {...props}>
      {children}
    </tr>
  );
}
export function TD({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-2.5 align-middle", className)} {...props}>
      {children}
    </td>
  );
}
