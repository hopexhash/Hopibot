"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import type { HealthCheck } from "@/server/health";
import type { CommandCenterState } from "@/server/queries/command-center";

/**
 * Tiny shared pollers: every component subscribing to the same endpoint shares one
 * request loop. Polling pauses while the tab is hidden.
 */
function createPoller<T>(url: string, intervalMs: number) {
  let data: T | null = null;
  let error: string | null = null;
  let subscribers = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const listeners = new Set<() => void>();
  let snapshot: { data: T | null; error: string | null } = { data, error };
  const emit = () => {
    snapshot = { data, error };
    listeners.forEach((l) => l());
  };
  const tick = async () => {
    if (typeof document !== "undefined" && document.hidden) {
      timer = setTimeout(tick, intervalMs);
      return;
    }
    try {
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      data = json as T;
      error = null;
    } catch (e) {
      error = (e as Error).message;
    }
    emit();
    if (subscribers > 0) timer = setTimeout(tick, intervalMs);
  };
  return {
    subscribe(cb: () => void) {
      listeners.add(cb);
      subscribers++;
      if (subscribers === 1) void tick();
      return () => {
        listeners.delete(cb);
        subscribers--;
        if (subscribers === 0 && timer) clearTimeout(timer);
      };
    },
    get: () => snapshot,
    /** Browser only: module state on the server is shared across requests/tenants. */
    seed(value: T) {
      if (typeof window === "undefined") return;
      if (!data) {
        data = value;
        snapshot = { data, error };
      }
    },
  };
}

const commandCenter = createPoller<CommandCenterState>("/api/command-center", 3000);
const health = createPoller<{ checks: HealthCheck[]; checkedAt: string }>("/api/health/system", 20000);
const empty: { data: null; error: string | null } = { data: null, error: null };

function useServerSnapshot<T>(initial: T | undefined) {
  return useMemo(() => {
    const snap = initial ? { data: initial, error: null } : empty;
    return () => snap;
  }, [initial]);
}

export function useCommandCenter(initial?: CommandCenterState) {
  if (initial) commandCenter.seed(initial);
  return useSyncExternalStore(commandCenter.subscribe, commandCenter.get, useServerSnapshot(initial));
}

export function useSystemHealth(initial?: { checks: HealthCheck[]; checkedAt: string }) {
  if (initial) health.seed(initial);
  return useSyncExternalStore(health.subscribe, health.get, useServerSnapshot(initial));
}

/** Re-renders every second (for live runtimes). */
export function useNow(active = true) {
  return useSyncExternalStore(
    (cb) => {
      if (!active) return () => {};
      const iv = setInterval(cb, 1000);
      return () => clearInterval(iv);
    },
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
}

export function useInterval(fn: () => void, ms: number) {
  useEffect(() => {
    const iv = setInterval(fn, ms);
    return () => clearInterval(iv);
  }, [fn, ms]);
}
