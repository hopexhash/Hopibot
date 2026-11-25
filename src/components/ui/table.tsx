import { cn } from "@/lib/utils";

export function Table({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("panel overflow-x-auto", className)}>
      <table className="w-full min-w-[640px] border-collapse text-[13px]">{children}</table>
    </div>
  );
}
export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="mono border-b border-border bg-[rgba(0,255,102,0.03)] text-left text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">{children}</thead>;
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
    <tr className={cn("border-b border-border last:border-0 transition-colors hover:bg-[rgba(0,255,102,0.035)]", className)} {...props}>
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
