import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/server/auth";
import { signUpAction } from "@/server/actions/auth";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Create workspace" };

export default async function SignupPage() {
  if (await getAuth()) redirect("/console");
  if (process.env.ALLOW_SIGNUP === "false") notFound();
  return <AuthForm mode="signup" action={signUpAction} signupEnabled />;
}
