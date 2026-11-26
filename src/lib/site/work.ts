/**
 * Portfolio of the public website. These are DEMO designs for fictional businesses, rendered
 * by our own website engine (scripts/render-demos.tsx) and labelled as demos wherever they
 * are shown. Real customer projects get `demo: false` and their own case study.
 */
export type Work = {
  key: string;
  name: string;
  type: string;
  /** Slug of the matching /website-laten-maken/<industry> page. */
  industry: string;
  /** One line on what makes this design its own. */
  note: string;
  demo: true;
};

export const WORK: Work[] = [
  { key: "de-gouden-lepel", name: "De Gouden Lepel", type: "Restaurant", industry: "restaurant", note: "Grote, stevige letters en één felle kleur: een zaak met karakter.", demo: true },
  { key: "garage-jansen", name: "Garage Jansen", type: "Autogarage", industry: "garage", note: "Rustig en zakelijk, met de afspraakknop altijd in beeld.", demo: true },
  { key: "barbershop-the-gents", name: "Barbershop The Gents", type: "Barbershop", industry: "kapper", note: "Klassieke schreefletters en warme tinten, als een goed geknipte coupe.", demo: true },
  { key: "bouwbedrijf-de-vries", name: "Bouwbedrijf De Vries", type: "Bouw & renovatie", industry: "bouwbedrijf", note: "Helder en betrouwbaar, met de offerteaanvraag bovenaan.", demo: true },
  { key: "beauty-by-noor", name: "Beauty by Noor", type: "Schoonheidssalon", industry: "schoonheidssalon", note: "Donker, verfijnd en rustig: de sfeer van de salon zelf.", demo: true },
  { key: "loodgieter-bakker", name: "Loodgieter Bakker", type: "Loodgieter", industry: "loodgieter", note: "Opvallend en direct: bij een lekkage moet bellen snel gaan.", demo: true },
  { key: "tandartspraktijk-centrum", name: "Tandartspraktijk Centrum", type: "Tandarts", industry: "tandarts", note: "Modern en geruststellend, met de afspraak op één tik afstand.", demo: true },
  { key: "makelaardij-maas", name: "Makelaardij Maas", type: "Makelaar", industry: "makelaar", note: "Uitgesproken letters en een frisse kleur voor een makelaar met een eigen gezicht.", demo: true },
];

export const workByKey = (key: string) => WORK.find((w) => w.key === key);
export const demoHref = (key: string) => `/site/demo/${key}.html`;
