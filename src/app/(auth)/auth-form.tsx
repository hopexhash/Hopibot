"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button, Field, Input } from "@/components/ui";
import type { AuthFormState } from "@/server/actions/auth";

type Props = {
  mode: "login" | "signup";
  action: (prev: AuthFormState, fd: FormData) => Promise<AuthFormState>;
  signupEnabled: boolean;
};

export function AuthForm({ mode, action, signupEnabled }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const f = state?.fields ?? {};
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{mode === "login" ? "Welcome back" : "Create your agency"}</h1>
      <p className="mt-1.5 text-[13px] text-muted">
        {mode === "login" ? "Sign in to your AgencyOS workspace." : "Set up a workspace for your website agency."}
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
      <p className="mt-6 text-center text-xs text-muted">
        {mode === "login" ? (
          signupEnabled ? (
            <>
              New to AgencyOS?{" "}
              <Link className="font-medium text-accent hover:underline" href="/signup">
                Create a workspace
              </Link>
            </>
          ) : null
        ) : (
          <>
            Already have an account?{" "}
            <Link className="font-medium text-accent hover:underline" href="/login">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
