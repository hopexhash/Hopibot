"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button, Field, Input } from "@/components/ui";
import type { AuthFormState } from "@/server/actions/auth";

type Props = {
  mode: "login" | "signup";
  action: (prev: AuthFormState, fd: FormData) => Promise<AuthFormState>;
  signupEnabled: boolean;
  /** Sign-in with a display code (TV or wall screen, read-only). */
  codeAction?: (prev: AuthFormState, fd: FormData) => Promise<AuthFormState>;
};

function CodeForm({ action }: { action: NonNullable<Props["codeAction"]> }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className="mt-8 border-t border-border pt-6">
      <p className="text-[13px] font-medium">TV or display screen</p>
      <p className="mt-1 text-xs text-muted">Enter your display code to open a read-only view.</p>
      <div className="mt-3 flex gap-2">
        <Input name="code" aria-label="Display code" placeholder="Display code" autoComplete="off" autoCapitalize="none" spellCheck={false} required className="min-w-0 flex-1" />
        <Button type="submit" size="lg" loading={pending}>
          Open
        </Button>
      </div>
      {state?.error && (
        <p role="alert" className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
          {state.error}
        </p>
      )}
    </form>
  );
}

export function AuthForm({ mode, action, signupEnabled, codeAction }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const f = state?.fields ?? {};
  return (
    <div>
      <h1 className="font-display text-[32px] font-semibold leading-tight tracking-[-0.03em]">{mode === "login" ? "Welcome back" : "Create your agency"}</h1>
      <p className="mt-1.5 text-[13px] text-muted">
        {mode === "login" ? "Sign in to your HOPI workspace." : "Set up a workspace for your website agency."}
      </p>
      <form action={formAction} className="mt-8 space-y-4">
        {mode === "signup" && (
          <>
            <Field label="Your name" htmlFor="name">
              <Input id="name" name="name" autoComplete="name" defaultValue={f.name} required />
            </Field>
            <Field label="Agency name" htmlFor="agency">
              <Input id="agency" name="agency" autoComplete="organization" defaultValue={f.agency} required />
            </Field>
          </>
        )}
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" defaultValue={f.email} required />
        </Field>
        <Field label="Password" htmlFor="password" hint={mode === "signup" ? "At least 10 characters including a number." : undefined}>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
        </Field>
        {state?.error && (
          <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
            {state.error}
          </p>
        )}
        <Button type="submit" variant="primary" size="lg" className="w-full" loading={pending}>
          {mode === "login" ? "Sign in" : "Create workspace"}
        </Button>
      </form>
      {mode === "login" && codeAction && <CodeForm action={codeAction} />}
      <p className="mt-6 text-center text-xs text-muted">
        {mode === "login" ? (
          signupEnabled ? (
            <>
              New to HOPI?{" "}
              <Link className="font-medium text-foreground underline underline-offset-2 hover:text-accent" href="/signup">
                Create a workspace
              </Link>
            </>
          ) : null
        ) : (
          <>
            Already have an account?{" "}
            <Link className="font-medium text-foreground underline underline-offset-2 hover:text-accent" href="/login">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
