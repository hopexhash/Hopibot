import "../guard";
import { UNIT_PRICING } from "../costs/pricing";
import { recordUsage, type UsageContext } from "../costs/usage";
import { AgentError } from "./anthropic";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";

/** Places API (New) — https://developers.google.com/maps/documentation/places/web-service/text-search */
const ENDPOINT = "https://places.googleapis.com/v1/places:searchText";
const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.addressComponents",
  "places.location",
  "places.websiteUri",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.rating",
  "places.userRatingCount",
  "places.regularOpeningHours.weekdayDescriptions",
  "places.businessStatus",
  "places.googleMapsUri",
  "places.primaryType",
  "places.types",
  "nextPageToken",
].join(",");

export type PlaceResult = {
  placeId: string;
  name: string;
  address: string | null;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  lat: number | null;
  lng: number | null;
  website: string | null;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
  openingHours: string[] | null;
  businessStatus: string | null;
  mapsUrl: string | null;
  primaryType: string | null;
};

type RawPlace = {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  addressComponents?: { longText: string; shortText: string; types: string[] }[];
  location?: { latitude: number; longitude: number };
  websiteUri?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  rating?: number;
  userRatingCount?: number;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  businessStatus?: string;
  googleMapsUri?: string;
  primaryType?: string;
};

function mapPlace(p: RawPlace): PlaceResult {
  const comp = (type: string) => p.addressComponents?.find((c) => c.types?.includes(type))?.longText ?? null;
  return {
    placeId: p.id,
    name: p.displayName?.text ?? "Unknown",
    address: p.formattedAddress ?? null,
    city: comp("locality") ?? comp("postal_town"),
    country: comp("country"),
    postalCode: comp("postal_code"),
    lat: p.location?.latitude ?? null,
    lng: p.location?.longitude ?? null,
    website: p.websiteUri ?? null,
    phone: p.internationalPhoneNumber ?? p.nationalPhoneNumber ?? null,
    rating: p.rating ?? null,
    reviewCount: p.userRatingCount ?? null,
    openingHours: p.regularOpeningHours?.weekdayDescriptions ?? null,
    businessStatus: p.businessStatus ?? null,
    mapsUrl: p.googleMapsUri ?? null,
    primaryType: p.primaryType ?? null,
  };
}

async function call(apiKey: string, body: Record<string, unknown>, fieldMask: string) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": fieldMask },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  });
  const json = (await res.json().catch(() => ({}))) as { places?: RawPlace[]; nextPageToken?: string; error?: { message: string; status: string } };
  if (!res.ok) {
    const msg = json.error?.message ?? `HTTP ${res.status}`;
    throw new AgentError(`Google Places error: ${msg}`, res.status === 429 ? "RATE_LIMIT" : "PLACES_ERROR", res.status === 429 || res.status >= 500);
  }
  return json;
}

export async function searchPlaces(
  ctx: UsageContext,
  q: { query: string; includedType?: string | null; center?: { lat: number; lng: number } | null; radiusKm?: number; limit: number; languageCode?: string; regionCode?: string },
): Promise<PlaceResult[]> {
  const cred = await getCredential(ctx.organizationId, "google_maps");
  if (!cred.secret) throw new IntegrationUnavailableError("google_maps");
  const out: PlaceResult[] = [];
  let pageToken: string | undefined;
  for (let page = 0; page < 3 && out.length < q.limit; page++) {
    const body: Record<string, unknown> = {
      textQuery: q.query,
      pageSize: Math.min(20, q.limit - out.length),
      languageCode: q.languageCode ?? "nl",
      ...(q.regionCode ? { regionCode: q.regionCode } : {}),
      ...(q.includedType ? { includedType: q.includedType, strictTypeFiltering: false } : {}),
      ...(q.center
        ? { locationBias: { circle: { center: { latitude: q.center.lat, longitude: q.center.lng }, radius: Math.min(50000, (q.radiusKm ?? 10) * 1000) } } }
        : {}),
      ...(pageToken ? { pageToken } : {}),
    };
    const json = await call(cred.secret, body, FIELD_MASK);
    await recordUsage(ctx, { provider: "google_places", operation: "text_search", costUsd: UNIT_PRICING.google_places_text_search });
    out.push(...(json.places ?? []).map(mapPlace));
    pageToken = json.nextPageToken;
    if (!pageToken) break;
  }
  void touchIntegrationSuccess(ctx.organizationId, "google_maps");
  return out.slice(0, q.limit);
}

/** Resolves a city's centre for radius-based searches (cheap, location-only field mask). */
export async function geocodeCity(ctx: UsageContext, city: string, country: string) {
  const cred = await getCredential(ctx.organizationId, "google_maps");
  if (!cred.secret) throw new IntegrationUnavailableError("google_maps");
  const json = await call(cred.secret, { textQuery: `${city}, ${country}`, pageSize: 1 }, "places.location");
  await recordUsage(ctx, { provider: "google_places", operation: "geocode_city", costUsd: UNIT_PRICING.google_places_text_search / 2 });
  const loc = json.places?.[0]?.location;
  return loc ? { lat: loc.latitude, lng: loc.longitude } : null;
}

export async function testGooglePlaces(apiKey: string) {
  const json = await call(apiKey, { textQuery: "Erasmusbrug Rotterdam", pageSize: 1 }, "places.id");
  return `Connected. Test search returned ${json.places?.length ?? 0} place(s).`;
}

/** Development-only mock results. Every business is clearly labelled as mock data. */
export function mockPlaces(q: { city: string; country: string; category: string; limit: number }): PlaceResult[] {
  const prefixes: Record<string, string[]> = {
    restaurant: ["Bistro", "Eetcafé", "Trattoria", "Brasserie", "Kitchen"],
    dentist: ["Tandartspraktijk", "Dental Studio", "Mondzorg"],
    hair_salon: ["Kapsalon", "Hair Studio", "Barber"],
    construction: ["Bouwbedrijf", "Renovatie", "Bouw & Onderhoud"],
    plumber: ["Loodgieter", "Installatiebedrijf"],
    electrician: ["Elektro", "Installatietechniek"],
    car_repair: ["Autobedrijf", "Garage"],
    real_estate: ["Makelaardij", "Vastgoed"],
    beauty_salon: ["Beauty Lounge", "Schoonheidssalon"],
    gym: ["Fitness", "Sportschool"],
    hotel: ["Hotel", "B&B"],
  };
  const names = ["Aurora", "De Haven", "Maas", "Noord", "Kade", "Oranje", "Linde", "Delfshaven", "Zuid", "Witte Huis", "Lijnbaan", "Blaak"];
  const pre = prefixes[q.category] ?? ["Service"];
  return Array.from({ length: q.limit }, (_, i) => {
    const hasSite = i % 3 === 1;
    return {
      placeId: `mock_${q.city.toLowerCase()}_${q.category}_${i}`,
      name: `[MOCK] ${pre[i % pre.length]} ${names[i % names.length]}${i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""}`,
      address: `Mockstraat ${i + 1}, 30${String(10 + (i % 80)).padStart(2, "0")} AB ${q.city}, ${q.country}`,
      city: q.city,
      country: q.country,
      postalCode: `30${String(10 + (i % 80)).padStart(2, "0")} AB`,
      lat: 51.92 + (i % 10) * 0.004,
      lng: 4.47 + (i % 7) * 0.006,
      website: hasSite ? `https://mock-business-${i}.invalid` : null,
      phone: i % 4 === 0 ? null : `+31 10 000 ${String(1000 + i).slice(-4)}`,
      rating: 3.6 + (i % 14) / 10,
      reviewCount: 12 + i * 7,
      openingHours: i % 5 === 0 ? null : ["Monday: 10:00 – 22:00", "Tuesday: 10:00 – 22:00", "Sunday: Closed"],
      businessStatus: "OPERATIONAL",
      mapsUrl: null,
      primaryType: q.category,
    };
  });
}
