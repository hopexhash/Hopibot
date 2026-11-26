import { redirect } from "next/navigation";
import { getAuth } from "@/server/auth";
import { signInAction, signInWithCodeAction } from "@/server/actions/auth";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getAuth()) redirect("/command");
  return <AuthForm mode="login" action={signInAction} codeAction={signInWithCodeAction} signupEnabled={process.env.ALLOW_SIGNUP !== "false"} />;
}
