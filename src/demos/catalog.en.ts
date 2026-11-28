import type { DemoSlug } from "./images";

/**
 * English texts of the demo websites in ./catalog.ts, shown on the English portfolio and project
 * pages. The names of the fictional businesses, their cities and the typefaces are not here:
 * they stay as they are. The demo websites themselves stay Dutch.
 */
export const DEMO_EN: Record<DemoSlug, { category: string; line: string; summary: string; concept: string; sections: string[] }> = {
  restaurant: {
    category: "Restaurant & fine dining",
    line: "An evening restaurant that reads like a magazine.",
    summary: "A dark, editorial design for a restaurant with a tasting menu. Large photography, a menu you actually want to read and booking a table in three taps.",
    concept: "You sell fine dining with atmosphere, not with a list. That's why the photography is cinematically large, the typography is a tall serif with italic accents and the page stays dark and warm, just like the dining room. The booking button travels with you, but never shouts.",
    sections: ["Cinematic opening", "The story of the kitchen", "Menu with three cards", "Signature dishes", "Wine & bar", "Gallery", "Guests in their own words", "Bookings, opening hours and directions"],
  },
  "beauty-salon": {
    category: "Beauty & skincare",
    line: "Calm, light and skin. Minimalist luxury.",
    summary: "A light and calm design for a skincare salon. Soft neutral tones, lots of white space, a clear treatment menu with prices and a booking flow that suits the atmosphere.",
    concept: "A treatment starts at the first screen. The design uses plenty of space, a refined serif and sandy tones, so the website gives off the same calm as the treatment room. Prices are out in the open: if you sell calm, you hide nothing.",
    sections: ["Calm opening", "The salon's philosophy", "Treatments with prices", "Results", "The space", "About the founder", "Experiences", "Book an appointment"],
  },
  construction: {
    category: "Construction & renovation",
    line: "Solid, direct and built to win quotes.",
    summary: "A strong, industrial design for a construction and renovation company. Heavy type, large-format project photography and a quote request nobody can miss.",
    concept: "A builder is chosen on evidence. So projects come first, with figures alongside, and the design is as solid as the work: wide capitals, signal yellow and a grid that recalls construction drawings. The quote request is split into steps, so it can be filled in even on scaffolding.",
    sections: ["Opening with key figures", "Services", "Project portfolio", "Step-by-step approach", "The company", "Clients in their own words", "Request a quote"],
  },
  "real-estate": {
    category: "Estate agency",
    line: "Homes presented as if in an architecture magazine.",
    summary: "A luxurious, editorial design for an estate agency. Full-width property photography, interactive property cards with filters and a detailed view for every home.",
    concept: "A home at the upper end of the market deserves more than a row of thumbnails. Every property gets space, like a page in a magazine, with the facts neatly underneath. Filters, favourites and the detailed view work instantly, without reloading.",
    sections: ["Opening with search bar", "Featured listings with filters", "Property details", "Services for sellers and buyers", "The team", "The neighbourhoods", "Request a valuation"],
  },
  fitness: {
    category: "Fitness & personal training",
    line: "Dark, hard and no excuses.",
    summary: "A dark, high-energy design for a training club. Full-screen typography, black-and-white photography with a single bright colour, programmes, coaches and memberships.",
    concept: "You sell a gym on feeling: do I want to train here? That's why everything is big, high-contrast and moving. One colour, acid green, points to the next step everywhere: book a trial session.",
    sections: ["Full-screen opening", "Training programmes", "Daily class timetable", "Coaches", "Memberships", "The club", "Member results", "Book a trial session"],
  },
  automotive: {
    category: "Cars & detailing",
    line: "Dark luxury for anyone who wants their car looking new.",
    summary: "A dark, cinematic design for a detailing studio. Gleaming paintwork in large format, a before-and-after slider, packages with prices and online appointment booking.",
    concept: "Detailing is precision work, and you need to see that before you read about it. Lots of black, thin lines of light like reflections on paintwork, and a before-and-after slider that proves the result. Packages can be compared at a glance.",
    sections: ["Cinematic opening", "Services", "Before and after", "Packages and prices", "The process", "The studio", "Customers in their own words", "Book an appointment"],
  },
  "law-firm": {
    category: "Law firm",
    line: "Authority without stiffness.",
    summary: "A restrained, editorial design for a law firm. Classic typography, lots of white space, clear practice areas and lawyers with a face.",
    concept: "You build trust with calm and precision. The design borrows from the typeset legal deed: narrow columns, small capitals, thin rules. Deep blue and parchment instead of black and white, so the firm stays approachable.",
    sections: ["Opening", "Practice areas", "Approach", "The lawyers", "Expertise and cases", "Publications", "Request an introductory meeting"],
  },
  fashion: {
    category: "Online fashion shop",
    line: "A fashion shop that looks like a lookbook.",
    summary: "A complete online shop for a fashion label. Editorial campaign images, collections, product cards with filters, a product view with sizes and a working shopping basket.",
    concept: "You buy fashion with your eyes. The shop opens like a lookbook and only then turns into a grid. Product cards are calm and large, and the product view and shopping basket slide over the page, so you never lose your place.",
    sections: ["Campaign opening", "Collections", "Product grid with filters", "Product view with sizes", "Shopping basket", "Lookbook", "The atelier", "Newsletter and customer service"],
  },
  dental: {
    category: "Dental practice",
    line: "Fresh, clear and reassuring.",
    summary: "A clean, modern design for a dental practice. Friendly typography, treatments in plain language, the team with a face and online appointment booking.",
    concept: "Nobody goes to the dentist for fun. The design lowers that barrier: soft shapes, lots of light, short sentences and the same offer everywhere, namely book an appointment or call. Anxious patients get a place of their own.",
    sections: ["Opening with appointment button", "Treatments", "Your first visit step by step", "The team", "The practice", "Fees and insurance", "Patients in their own words", "Book an appointment"],
  },
  saas: {
    category: "Software & SaaS",
    line: "Explaining software by showing it.",
    summary: "A futuristic design for a software company. The product is recreated in the page itself and moves along, with features, a pricing table with a toggle and interactive elements.",
    concept: "You sell software by showing it. Instead of screenshots, the interface is recreated in the page: the schedule shifts, numbers count up. Dark, with light that seems to come from the product itself.",
    sections: ["Opening with moving product", "Features", "Product demo in tabs", "Integrations", "Pricing with monthly and yearly toggle", "Customers in their own words", "Frequently asked questions", "Start a trial"],
  },
  hotel: {
    category: "Hotel & hospitality",
    line: "A canal-side hotel where you've arrived before you book.",
    summary: "A luxurious, cinematic design for a boutique hotel. Rooms and suites with prices, facilities, a gallery and a booking bar that does the maths.",
    concept: "You book a hotel on feeling first and facts second. So the atmosphere comes first, wide and slow, then the rooms with everything you want to know. The booking bar stays in view and works out the number of nights for you.",
    sections: ["Cinematic opening with booking bar", "The house", "Rooms and suites", "Restaurant and bar", "Wellness", "Gallery", "The neighbourhood", "Book"],
  },
  "creative-agency": {
    category: "Creative agency",
    line: "Headstrong, big and in motion.",
    summary: "An experimental design for a creative agency. Huge typography, a project list that responds to your cursor, unexpected grids and lots of movement.",
    concept: "A creative agency has to be daring on its own website. So the grid breaks, text runs off the screen and the page changes colour for each section. Beneath all that force, the structure stays simple: work, services, contact.",
    sections: ["Typographic opening", "Manifesto", "Projects with previews", "Services", "How we work", "The team", "Clients", "Contact"],
  },
};
