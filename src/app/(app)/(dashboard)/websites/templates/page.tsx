import { and, desc, eq, isNull } from "drizzle-orm";
import Link from "next/link";
import { PageHeader } from "@/components/app/page";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { LOOKS_OF_CATEGORY } from "@/lib/design-select";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { COLORWAYS } from "@/sites/colorways";
import { designName, FAMILY_DESIGNS } from "@/sites/designs";
import { FAMILIES } from "@/sites/families";
import { TemplateGallery, type GalleryTemplate } from "./template-gallery";

export const metadata = { title: "Template library" };

/** Sector of each business category, for the filter chips. */
const SECTOR_OF: Record<string, string> = {
  restaurant: "Food & drink", italian_restaurant: "Food & drink", turkish_restaurant: "Food & drink", sushi_restaurant: "Food & drink",
  burger_restaurant: "Food & drink", pizzeria: "Food & drink", bar: "Food & drink", coffee_shop: "Food & drink", bakery: "Food & drink", street_food: "Food & drink",
  asian_restaurant: "Food & drink", food_truck: "Food & drink", hotel: "Hospitality", event_business: "Hospitality", wedding_planner: "Hospitality", travel_agency: "Hospitality",
  barbershop: "Beauty & care", hair_salon: "Beauty & care", beauty_salon: "Beauty & care", beauty_clinic: "Beauty & care", tattoo_studio: "Beauty & care",
  dentist: "Health", physiotherapist: "Health", gym: "Sport", personal_trainer: "Sport",
  car_detailing: "Automotive", car_repair: "Automotive", car_dealer: "Automotive",
  construction: "Trades & home", cleaning: "Trades & home", landscaping: "Trades & home", plumber: "Trades & home", electrician: "Trades & home",
  roofing: "Trades & home", local_service: "Trades & home", interior_designer: "Trades & home", architect: "Trades & home",
  real_estate: "Professional", lawyer: "Professional", accountant: "Professional", consultant: "Professional",
  marketing_agency: "Creative & tech", it_company: "Creative & tech", photographer: "Creative & tech",
  clothing_store: "Retail", jewelry_store: "Retail", pet_store: "Retail", shop: "Retail",
};
const SECTORS = [...new Set(Object.values(SECTOR_OF))];

function templates(): GalleryTemplate[] {
  return FAMILY_DESIGNS.filter((d) => FAMILIES[d.key]).map((d) => {
    const first = BUSINESS_CATEGORIES.filter((c) => c.family === d.key);
    const also = BUSINESS_CATEGORIES.filter((c) => c.family !== d.key && (LOOKS_OF_CATEGORY[c.key] ?? []).includes(d.key));
    return {
      key: d.key,
      name: d.name,
      industry: d.industry,
      description: d.description,
      preview: `/site/work/${d.demo}-d-720.webp`,
      original: Boolean(d.original),
      fonts: d.fonts.display + (d.fonts.body !== d.fonts.display ? ` + ${d.fonts.body}` : ""),
      palette: [d.palette.bg, d.palette.ink, d.palette.primary, d.palette.accent],
      features: [...d.features],
      sectors: [...new Set([...first, ...also].map((c) => SECTOR_OF[c.key]).filter(Boolean))],
      firstFor: first.map((c) => c.label),
      alsoFor: also.map((c) => c.label),
      categoryKeys: [...first, ...also].map((c) => c.key),
      terms: [...first, ...also].flatMap((c) => [c.key.replace(/_/g, " "), c.placesType ?? ""]).join(" ").replace(/_/g, " "),
      looks: [
        { name: "Original", swatch: d.palette.accent, href: `/voorbeeld/${d.key}` },
        ...(COLORWAYS[d.key] ?? []).map((cw, i) => ({ name: cw.name, swatch: cw.swatch, href: `/voorbeeld/${d.key}-${i + 1}` })),
      ],
    };
  });
}

export default async function TemplateLibraryPage() {
  const auth = await requireAuth();
  const p = schema.websiteProjects;
  const rows = await db()
    .select({ id: p.id, template: p.templateKey, status: p.status, name: schema.businesses.name })
    .from(p)
    .innerJoin(schema.businesses, eq(schema.businesses.id, p.businessId))
    .where(and(eq(p.organizationId, auth.org.id), isNull(p.deletedAt)))
    .orderBy(desc(p.updatedAt))
    .limit(300);
  const list = templates();
  return (
    <>
      <PageHeader
        eyebrow="Websites"
        title="Template library"
        description={`${list.length} complete website designs, each in its original colours and two colourways. New websites get the best-fitting design that no nearby business in the same branch already has. Preview a template on a computer or phone, or apply it to an existing website: its content stays, the design changes.`}
        actions={
          <Link href="/websites" className="rounded-lg border border-border px-3 py-2 text-[13px] font-medium hover:border-border-strong">
            ← Back to websites
          </Link>
        }
      />
      <TemplateGallery
        templates={list}
        sectors={SECTORS.filter((s) => list.some((t) => t.sectors.includes(s)))}
        projects={rows.map((r) => ({ id: r.id, name: r.name, template: designName(r.template), status: r.status }))}
        categories={BUSINESS_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))}
        canEdit={hasRole(auth.role, "member")}
      />
    </>
  );
}
