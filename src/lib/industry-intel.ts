import type { DirectionKey } from "@/sites/identity";

/**
 * Industry design intelligence: what a website for this kind of business has to achieve,
 * what its visitors look for, which content earns a place, which imagery fits, and which
 * design directions suit it. It informs the creative-direction stage; it is guidance, not a
 * template. Nothing here may be presented as a fact about a specific business.
 */
export type IndustryProfile = {
  label: string;
  audience: string;
  /** What a visitor wants to get done on the site. */
  goal: string;
  /** Sections that usually earn their place (section type keys). */
  essentials: string[];
  /** Sections that only belong when the business really has the material. */
  optional: string[];
  /** Photography that fits: subject and mood, as search guidance. */
  imagery: string;
  /** Suitable directions. Deliberately broad: the obvious choice is only one of several. */
  directions: DirectionKey[];
  /** The predictable look to steer away from. */
  cliche: string;
  booking: "reservation" | "appointment" | "quote" | "order";
};

const P = (p: IndustryProfile) => p;

const PROFILES = {
  restaurant: P({ label: "restaurant", audience: "locals and visitors choosing where to eat tonight or planning an occasion", goal: "see the atmosphere and the menu, then reserve", essentials: ["menu", "booking", "hours"], optional: ["showcase", "gallery", "statement", "about", "team", "faq"], imagery: "the room at service, plated dishes shot close and dark or bright depending on the mood, hands and craft in the kitchen", directions: ["hospitality", "luxury-editorial", "premium-dark", "warm-organic", "modern-minimal", "swiss", "creative-studio"], cliche: "beige background, serif headline and a centred hero for every restaurant", booking: "reservation" }),
  fastfood: P({ label: "fast casual / takeaway", audience: "hungry people deciding quickly, often on a phone", goal: "see the food and order or find the address within seconds", essentials: ["menu", "order", "hours"], optional: ["statement", "gallery", "about", "faq"], imagery: "close, saturated, appetite-first food shots; street energy", directions: ["bold-brutalist", "playful", "modern-commerce", "creative-studio", "industrial", "swiss"], cliche: "red and yellow on black with a burger clip-art feel", booking: "order" }),
  cafe: P({ label: "coffee shop / bakery", audience: "regulars, remote workers and passers-by looking for a place with character", goal: "get a feel for the place, check the opening hours and the offer", essentials: ["about", "menu", "hours"], optional: ["showcase", "statement", "gallery", "order", "faq"], imagery: "morning light, hands and cups, the counter, bakes on paper and wood", directions: ["scandinavian", "warm-organic", "luxury-editorial", "modern-minimal", "creative-studio", "playful", "swiss"], cliche: "brown kraft-paper look with a coffee-bean icon", booking: "order" }),
  grooming: P({ label: "barber / hairdresser", audience: "people who care how they look and want to book without phoning", goal: "see the style of work, the prices and book a slot", essentials: ["services", "booking", "hours"], optional: ["team", "gallery", "statement", "beforeafter", "about", "faq"], imagery: "real cuts and colour work, the chair and tools, portraits with character", directions: ["bold-brutalist", "swiss", "modern-minimal", "luxury-editorial", "creative-studio", "industrial", "premium-dark", "scandinavian"], cliche: "black background with gold accents and a vintage razor", booking: "appointment" }),
  beauty: P({ label: "beauty salon / clinic", audience: "clients looking for a calm, trustworthy place for treatments", goal: "understand the treatments, feel reassured and book", essentials: ["services", "booking", "about"], optional: ["team", "statement", "gallery", "faq", "packages", "hours"], imagery: "treatment details, skin and hands, calm interiors, soft daylight", directions: ["luxury-editorial", "scandinavian", "modern-minimal", "warm-organic", "architectural", "hospitality", "creative-studio"], cliche: "blush pink with a script font and rose-gold sparkle", booking: "appointment" }),
  automotive: P({ label: "garage / car services", audience: "car owners who want an honest answer, a price and a date", goal: "see what is done, trust the workshop and book or call", essentials: ["services", "booking", "features"], optional: ["process", "about", "statement", "faq", "hours", "gallery"], imagery: "the workshop in use, a car on the lift, details of paint and tools, people at work", directions: ["industrial", "swiss", "contemporary-corporate", "bold-brutalist", "modern-minimal", "premium-dark", "future-tech"], cliche: "carbon-fibre textures, red speed stripes and a stock handshake", booking: "appointment" }),
  trades: P({ label: "trade / construction / home services", audience: "home owners and businesses with a job that needs doing properly", goal: "check the firm does this kind of work nearby, then request a quote or call", essentials: ["services", "process", "contact"], optional: ["features", "gallery", "statement", "about", "faq", "booking"], imagery: "finished projects, work in progress on site, materials and detail, the team at work", directions: ["industrial", "swiss", "contemporary-corporate", "architectural", "modern-minimal", "bold-brutalist", "scandinavian"], cliche: "blue and orange with a hard-hat icon and a stock builder giving a thumbs-up", booking: "quote" }),
  green: P({ label: "garden / landscaping", audience: "home owners who want a garden designed, built or maintained", goal: "see the kind of gardens made, understand the process and ask for a visit", essentials: ["services", "process", "gallery"], optional: ["about", "statement", "showcase", "faq", "contact"], imagery: "finished gardens through the seasons, planting detail, terraces and paths, hands in soil", directions: ["warm-organic", "scandinavian", "luxury-editorial", "architectural", "modern-minimal", "swiss"], cliche: "bright lime green with a leaf logo", booking: "quote" }),
  cleaning: P({ label: "cleaning services", audience: "offices and households that want reliable, recurring help", goal: "see what is included, trust the people and request a quote", essentials: ["services", "features", "contact"], optional: ["process", "faq", "statement", "about", "packages"], imagery: "bright clean spaces, light through windows, detail of surfaces, people at work", directions: ["scandinavian", "modern-minimal", "contemporary-corporate", "swiss", "playful", "warm-organic"], cliche: "aqua blue with sparkles and a spray-bottle icon", booking: "quote" }),
  health: P({ label: "healthcare practice", audience: "patients who want a careful practitioner close to home", goal: "check treatments and how to register, then book or call", essentials: ["services", "booking", "about"], optional: ["team", "faq", "process", "hours", "statement"], imagery: "the practice interior in daylight, calm details, hands and care, never clinical horror", directions: ["scandinavian", "modern-minimal", "contemporary-corporate", "warm-organic", "architectural", "swiss"], cliche: "teal with a stock photo of a perfect smile", booking: "appointment" }),
  professional: P({ label: "professional services", audience: "clients choosing an adviser they can trust with something important", goal: "understand the expertise and the way of working, then make contact", essentials: ["services", "about", "contact"], optional: ["process", "team", "statement", "faq", "features"], imagery: "people in conversation, the office, architecture and detail; restrained and real", directions: ["architectural", "swiss", "luxury-editorial", "modern-minimal", "contemporary-corporate", "premium-dark", "scandinavian"], cliche: "navy with a skyline photo and scales-of-justice icon", booking: "quote" }),
  creative: P({ label: "creative / agency / studio", audience: "clients looking for a partner with taste and a clear method", goal: "see the work and the thinking, then start a conversation", essentials: ["services", "statement", "contact"], optional: ["gallery", "process", "about", "team", "showcase", "faq"], imagery: "the work itself, process and making, studio atmosphere", directions: ["creative-studio", "swiss", "bold-brutalist", "architectural", "modern-minimal", "future-tech", "luxury-editorial"], cliche: "purple gradient blobs and 'we craft digital experiences'", booking: "quote" }),
  tech: P({ label: "IT / technology", audience: "businesses that need technology to work without drama", goal: "understand what is offered and how support works, then ask for a proposal", essentials: ["services", "features", "contact"], optional: ["process", "statement", "about", "faq", "packages"], imagery: "people at work, hardware detail, clean environments; no glowing globes", directions: ["future-tech", "swiss", "modern-minimal", "contemporary-corporate", "architectural", "creative-studio"], cliche: "dark blue with circuit lines and a glowing cloud", booking: "quote" }),
  fitness: P({ label: "gym / trainer / studio", audience: "people who want to get moving and need a nudge", goal: "see the offer and the atmosphere, then book a trial", essentials: ["services", "booking", "about"], optional: ["packages", "team", "statement", "gallery", "faq", "hours"], imagery: "real training moments, the space, effort and coaching; no fitness models", directions: ["bold-brutalist", "industrial", "swiss", "creative-studio", "modern-minimal", "scandinavian", "playful"], cliche: "black and neon with a shouting headline", booking: "appointment" }),
  property: P({ label: "real estate / interiors", audience: "people making a large decision about a home or space", goal: "judge the taste and local knowledge, then plan a meeting", essentials: ["services", "about", "contact"], optional: ["process", "showcase", "gallery", "statement", "team", "faq"], imagery: "interiors and facades in natural light, material detail, streets and neighbourhoods", directions: ["architectural", "luxury-editorial", "scandinavian", "swiss", "modern-minimal", "premium-dark", "warm-organic"], cliche: "navy and gold with a keys-in-hand photo", booking: "appointment" }),
  retail: P({ label: "shop / retail", audience: "shoppers who want to know what is sold and whether it is worth the trip", goal: "see the range and the style, find opening hours or the web shop", essentials: ["services", "hours", "about"], optional: ["gallery", "showcase", "statement", "order", "faq"], imagery: "products styled simply, the shop floor, detail and texture", directions: ["modern-commerce", "swiss", "luxury-editorial", "scandinavian", "creative-studio", "playful", "modern-minimal"], cliche: "a generic product grid with sale banners", booking: "order" }),
  hospitality: P({ label: "hotel / events", audience: "guests planning a stay or an occasion", goal: "feel the place, check what is offered and enquire", essentials: ["about", "services", "booking"], optional: ["showcase", "gallery", "statement", "faq", "hours"], imagery: "rooms and spaces in atmospheric light, details of hosting, the surroundings", directions: ["hospitality", "luxury-editorial", "architectural", "premium-dark", "warm-organic", "scandinavian"], cliche: "stock champagne glasses and a script logo", booking: "reservation" }),
  body_art: P({ label: "tattoo / piercing studio", audience: "people choosing an artist whose style they trust", goal: "see the artists' work and how booking a session works", essentials: ["gallery", "team", "booking"], optional: ["process", "faq", "statement", "about", "hours"], imagery: "healed work, the artist at the station, line and ink detail", directions: ["bold-brutalist", "premium-dark", "creative-studio", "swiss", "architectural", "industrial"], cliche: "skulls, flames and a gothic blackletter font", booking: "appointment" }),
  general: P({ label: "local business", audience: "people nearby who need this service", goal: "understand the offer quickly and get in touch", essentials: ["services", "about", "contact"], optional: ["features", "process", "faq", "statement", "hours"], imagery: "the people and the work, honestly photographed", directions: ["contemporary-corporate", "swiss", "modern-minimal", "scandinavian", "warm-organic", "industrial"], cliche: "blue gradient hero with three icon cards", booking: "quote" }),
} satisfies Record<string, IndustryProfile>;

const BY_CATEGORY: Record<string, keyof typeof PROFILES> = {
  restaurant: "restaurant", italian_restaurant: "restaurant", turkish_restaurant: "restaurant", sushi_restaurant: "restaurant", asian_restaurant: "restaurant",
  burger_restaurant: "fastfood", pizzeria: "fastfood", street_food: "fastfood", food_truck: "fastfood",
  coffee_shop: "cafe", bakery: "cafe",
  barbershop: "grooming", hair_salon: "grooming",
  beauty_salon: "beauty", beauty_clinic: "beauty",
  car_detailing: "automotive", car_repair: "automotive", car_dealer: "automotive",
  construction: "trades", plumber: "trades", electrician: "trades", roofing: "trades",
  landscaping: "green", cleaning: "cleaning",
  dentist: "health", physiotherapist: "health",
  lawyer: "professional", accountant: "professional", consultant: "professional",
  marketing_agency: "creative", photographer: "creative", event_business: "hospitality",
  it_company: "tech", gym: "fitness", personal_trainer: "fitness",
  real_estate: "property", interior_designer: "property",
  clothing_store: "retail", jewelry_store: "retail", shop: "retail", hotel: "hospitality", tattoo_studio: "body_art", local_service: "general",
};

export function industryProfile(category: string): IndustryProfile {
  return PROFILES[BY_CATEGORY[category] ?? "general"];
}
