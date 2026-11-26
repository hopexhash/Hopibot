import { redirect } from "next/navigation";
import { getAuth } from "@/server/auth";
import { signInAction, signInWithCodeAction } from "@/server/actions/auth";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Sign in" };

// With a secret sign-in address, /signup does not exist for visitors, so no link to it.
export default async function LoginPage() {
  if (await getAuth()) redirect("/command");
  return <AuthForm mode="login" action={signInAction} codeAction={signInWithCodeAction} signupEnabled={process.env.ALLOW_SIGNUP !== "false" && !process.env.CONTROL_PATH} />;
}
