/**
 * English content of the homepage (/en). Same shape as HOME, SERVICES, PROCESS and HOME_FAQ in
 * ./home.ts. Prices are never written here: they come from Settings → Pricing through the
 * placeholders. Links point to the English addresses from NL_TO_EN in ./i18n.ts.
 */
export const HOME_EN = {
  kicker: "Web design agency · Netherlands & Belgium",
  /** Display statement of the hero (English). */
  statement: ["We make the", "internet feel", "different."] as const,
  /** The page's H1: what HOPI is, in the words people search for. */
  h1: "Web design agency for websites, online shops and web applications people remember.",
  lead: "First you see a design of your own website. Only then do you decide.",
  cta: "Start a project",
  ctaShort: "Start a project",
  cta2: "See our work",
  disciplines: ["Web design", "Development", "E-commerce", "Branding"],

  intro: {
    label: "Introduction",
    /** Lights up word by word while you scroll. */
    statement: "HOPI is a digital agency. We design and build websites, online shops and web applications that look different, load fast and do what they need to do. No templates. No surprises.",
    text: "Whether you want a professional website made, an online shop built or your current website renewed: we work as a web design agency for business owners across the Netherlands and Belgium, from Amsterdam to Antwerp.",
    facts: [
      { label: "Where we work", value: "Netherlands & Belgium" },
      { label: "How we work", value: "See first, pay later" },
      { label: "Websites from", value: "{from}" },
    ],
  },

  work: {
    label: "Selected work",
    title: ["Selected", "work"] as const,
    note: "Demo websites: complete websites we designed and built for fictional businesses, to show what we deliver. They are not client projects.",
    all: "See all work",
  },

  services: {
    label: "Services",
    title: "What we make",
    text: "One team for design, technology and everything that comes after.",
    note: "Our websites have a fixed price. Online shops, applications and branding are quoted individually.",
  },

  why: {
    label: "Why HOPI",
    items: [
      { title: ["See first.", "Then decide."], text: "You get a design of your own website before you pay anything. If you don't like it, it ends there and you're not tied to anything." },
      { title: ["No", "templates."], text: "Every design gets its own typefaces, colours and layout. No two websites are the same, and certainly not yours and your competitor's." },
      { title: ["Fixed", "prices."], text: "A website has a fixed price with us, from {from} excluding VAT. You know where you stand beforehand. [See the prices](/en/pricing)." },
      { title: ["One", "point of contact."], text: "From the first design to hosting and [maintenance](/en/website-maintenance) afterwards. You don't have to do anything technical." },
    ],
  },

  process: {
    label: "How we work",
    title: "From idea to live",
  },

  closing: {
    /** Display statement of the closing section (English). */
    statement: ["Let's build", "something", "extraordinary."] as const,
    text: "Tell us about your project. You'll receive a design first, free and with no obligation.",
  },
};

export const SERVICES_EN = [
  { title: "Website design", en: "Website development", text: "A tailor-made website, designed for your business and built to load fast on every screen.", tags: ["Design", "Development", "Mobile", "SEO basics"], href: "/en/website-design", more: "More about having a website made" },
  { title: "Online shops", en: "E-commerce development", text: "An online shop that sells without the hassle: clear product pages, a smooth checkout and payment the way your customers are used to.", tags: ["Product pages", "Checkout", "Payments"], href: "/en/website-design/online-shop", more: "Request a quote" },
  { title: "Website redesign", en: "Website redesign", text: "Your current website, redesigned. You put the new design next to the old one and only then decide.", tags: ["New design", "Same domain", "Better technology"], href: "/en/website-redesign", more: "More about a website redesign" },
  { title: "Web applications", en: "Custom web applications", text: "Portals, dashboards and tools that do exactly what your business needs.", tags: ["Portals", "Dashboards", "Integrations"], href: "/en#contact", more: "Discuss your idea" },
  { title: "Branding & design", en: "Branding & digital design", text: "Logo, colours, typefaces and visual style that work online and offline.", tags: ["Logo", "Brand identity", "Visual style"], href: "/en#contact", more: "Request a quote" },
];

export const PROCESS_EN = [
  { title: "Tell us about your business", text: "Fill in the form or send a message. If you already have a website, we'll look at that too." },
  { title: "Receive your design", text: "You see your new website, with your own name, services and style. Free and with no obligation.", free: true },
  { title: "We build", text: "Happy with it? Then you choose a package and together we finalise the copy, images and details." },
  { title: "You go live", text: "On your own domain name. We take care of hosting, security and maintenance." },
];

export const HOME_FAQ_EN = [
  { q: "Is the design really free?", a: "Yes. First you see a design of your own website. You only pay if you like it and choose a package. If you don't like it, you're not tied to anything." },
  { q: "How much does a website from HOPI cost?", a: "A one-page website costs {starter}, a complete website {business} and a custom-designed website {premium}. These are one-off amounts, excluding {vat} VAT. Hosting and maintenance cost from {hosting} per month. The full overview is on the [pricing](/en/pricing) page." },
  { q: "Is HOPI a website builder I have to work with myself?", a: "No. A website builder is a program where you drag and type everything yourself. We are an agency: we design and build your website for you. You can read about the difference in [hiring a web designer or building it yourself](/en/blog/hire-a-web-designer-or-build-it-yourself)." },
  { q: "How quickly will my website be online?", a: "That depends on the package and on how quickly the copy and photos are ready. As soon as you approve the design, we agree on a schedule together." },
  { q: "I already have a website. Can it be replaced?", a: "Yes. We make a new design that you can put next to your current website. Read more about a [website redesign](/en/website-redesign)." },
  { q: "Do you also make online shops and web applications?", a: "Yes. We quote for those individually, because every online shop and every application is different. Tell us what you need using the form and you'll hear what it costs before you decide." },
  { q: "Who does HOPI work for?", a: "For business owners in the Netherlands and Belgium: from restaurants and hairdressers to construction companies, freelancers and small businesses. Even if you don't have a website at all yet." },
];
