import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { requireAuth } from "@/server/auth";
import { FAMILY_DESIGNS } from "@/sites/designs";
import { FAMILIES } from "@/sites/families";
import { ConsoleChat } from "./console-chat";

export const metadata = { title: "Console" };

/** The simple console: one page, one chat box. Everything typed here starts the real agents after a confirmation. */
export default async function ConsolePage() {
  const auth = await requireAuth();
  return (
    <ConsoleChat
      userName={auth.user.name?.split(" ")[0] ?? null}
      categories={BUSINESS_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))}
      templates={FAMILY_DESIGNS.filter((d) => FAMILIES[d.key]).map((d) => ({ key: d.key, name: d.name, industry: d.industry }))}
    />
  );
}
