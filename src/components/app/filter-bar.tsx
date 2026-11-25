"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Select } from "@/components/ui";

export type FilterDef = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
};

/** URL-driven filters: every change updates the query string so views are shareable. */
export function FilterBar({
  filters,
  searchPlaceholder = "Search…",
}: {
  filters: FilterDef[];
  searchPlaceholder?: string;
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(sp);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.replace(`${pathname}?${next}`);
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const active = filters.some((f) => sp.get(f.key)) || sp.get("q");
  return (
    <div className="mb-4 grid grid-cols-2 items-center gap-2 sm:flex sm:flex-wrap">
      <div className="relative col-span-2 sm:w-64">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
        <Input
          value={q}
          placeholder={searchPlaceholder}
          className="pl-8"
          aria-label="Search"
          onChange={(e) => {
            setQ(e.target.value);
            if (timer.current) clearTimeout(timer.current);
            const v = e.target.value;
            timer.current = setTimeout(() => set("q", v), 350);
          }}
        />
      </div>
      {filters.map((f) => (
        <Select
          key={f.key}
          aria-label={f.label}
          value={sp.get(f.key) ?? ""}
          onChange={(e) => set(f.key, e.target.value)}
          className="min-w-0 truncate sm:w-auto sm:min-w-36"
        >
          <option value="">{f.label}</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      ))}
      {active && (
        <Button
          variant="ghost"
          size="sm"
          className="col-span-2 sm:col-span-1"
          onClick={() => {
            setQ("");
            router.replace(pathname);
          }}
        >
          <X /> Reset
        </Button>
      )}
    </div>
  );
}
