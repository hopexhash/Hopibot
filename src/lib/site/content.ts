import { ARTICLES, CATEGORIES } from "./blog";
import { ARTICLES_EN, CATEGORIES_EN } from "./blog.en";
import { HOME, HOME_FAQ, PROCESS, SERVICES } from "./home";
import { HOME_EN, HOME_FAQ_EN, PROCESS_EN, SERVICES_EN } from "./home.en";
import type { Locale } from "./i18n";
import { ALL_LANDINGS, INDUSTRIES } from "./landing";
import { ALL_LANDINGS_EN, INDUSTRIES_EN } from "./landing.en";

/** The content of the public website in one language. */
export const landingsOf = (lang: Locale) => (lang === "en" ? ALL_LANDINGS_EN : ALL_LANDINGS);
export const industriesOf = (lang: Locale) => (lang === "en" ? INDUSTRIES_EN : INDUSTRIES);
export const articlesOf = (lang: Locale) => (lang === "en" ? ARTICLES_EN : ARTICLES);
export const categoriesOf = (lang: Locale) => (lang === "en" ? CATEGORIES_EN : CATEGORIES);
export const homeOf = (lang: Locale) => (lang === "en" ? { HOME: HOME_EN, SERVICES: SERVICES_EN, PROCESS: PROCESS_EN, HOME_FAQ: HOME_FAQ_EN } : { HOME, SERVICES, PROCESS, HOME_FAQ });
/** Blog address of an article in its language. */
export const articlePath = (slug: string, lang: Locale) => (lang === "en" ? `/en/blog/${slug}` : `/blog/${slug}`);
