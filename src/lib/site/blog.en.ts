/**
 * English version of the blog (/en/blog). Same articles, order, dates, images and sources as
 * blog.ts; slugs and links follow NL_TO_EN in i18n.ts. The body uses the same Markdown subset
 * and the same price placeholders ({starter}, {vat}, ...), which are filled from Settings → Pricing.
 */
import type { Article, CategoryKey } from "./blog";

export const CATEGORIES_EN: Record<CategoryKey, { label: string; text: string }> = {
  kosten: { label: "Costs and prices", text: "What a website costs, what you pay for and which costs come back." },
  aanpak: { label: "Getting a website made", text: "How to go about it, what to look out for and which choices you make." },
  vindbaarheid: { label: "Getting found", text: "Google, mobile and more customers from your website." },
  branches: { label: "By industry", text: "What should be on the website of your kind of business." },
};

export const ARTICLES_EN: Article[] = [
  {
    slug: "how-much-does-a-website-cost",
    category: "kosten",
    keyword: "how much does a website cost",
    title: "How much does a website cost in 2026?",
    seoTitle: "How much does a website cost in 2026? | HOPI",
    description: "How much does it cost to have a website made? The three routes, what exactly you pay for, the ongoing costs and what to look out for in quotes.",
    excerpt: "From building it yourself to hiring an agency: what you pay, what for, and which costs come back every month.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 4,
    body: `The honest answer: it depends on who makes the website and what it needs to do. A simple website costs a few hundred euros, while a large custom site can run into the thousands. In this article you'll read where that difference comes from, so you can compare quotes without comparing apples with oranges.

## The three routes and roughly what they cost

The amounts below are rough indications from public price guides (as of November 2026). The sources differ quite a bit from one another, so treat them as a direction, not a price list.

| Route | Indication | Suits |
| Building it yourself with a website builder | Usually a subscription of a few tens of euros a month | People who have the time and want to do it themselves |
| Freelancer | Often between a few hundred and a few thousand euros, one-off | A simple to medium-sized business website |
| Web design agency | Often a few thousand euros or more | Custom work, large websites, online shops |

If you build it yourself, you pay little money, but you do pay with your time. With a freelancer or agency, you pay for experience: someone who knows how to make clear to a visitor in a few seconds what you do. In [hire a web designer or build it yourself](/en/blog/hire-a-web-designer-or-build-it-yourself) we weigh up that choice in more detail.

## What exactly are you paying for?

The price of a website is mainly determined by five things:

- **The design.** Filling in an existing template is cheaper than a design of your own.
- **The number of pages.** One page with everything on it, or separate pages for each service.
- **Text and photos.** Do you supply them yourself, or have them made?
- **Features.** Online reservations, a booking system, multiple languages or an online shop take extra work.
- **Findability.** Just a solid technical foundation, or also ongoing work on your position in Google.

Ask with every quote which of these five are included. Two quotes with the same total can contain very different things.

## The costs that come back every month or every year

A website is not a one-off purchase. Also budget for:

- **A domain name**, which you renew every year.
- **Hosting**, the place where your website lives.
- **Maintenance**: updates, security, backups and keeping the content up to date.

These ongoing costs are often tucked away in the small print of quotes, even though over a few years they can add up to more than the build itself. We go into this in more depth in [how much does website maintenance cost](/en/blog/how-much-does-website-maintenance-cost).

## What to look out for in a quote

- **Who owns the domain name and the content?** Make sure the domain name is registered in your name and that you can take your text and photos with you.
- **How many rounds of changes are included?** And what does an extra round cost?
- **What do you pay per month, and what for?** Ask what happens if you cancel.
- **When do you pay?** Many agencies ask for a deposit before you've seen anything.

## What does a website from HOPI cost?

We work with fixed prices, excluding {vat} VAT:

| Package | Price | What you get |
| Starter | {starter} | A professional one-page website |
| Business | {business} | A complete website of up to five pages |
| Premium | {premium} | Custom designed, with a reservation or booking system, for example |

Hosting and maintenance cost from {hosting} per month. The main difference is the order: you first see a free design of your own website, and only then choose a package. All the details are on the [pricing](/en/pricing) page.

> Curious what your website could look like? [Request a free design](#contact). There's no obligation.`,
    related: ["/en/pricing", "/en/blog/hire-a-web-designer-or-build-it-yourself", "/en/blog/how-much-does-website-maintenance-cost", "/en/website-design"],
  },
  {
    slug: "hire-a-web-designer-or-build-it-yourself",
    category: "aanpak",
    keyword: "build your own website or hire a web designer",
    title: "Hire a web designer or build your website yourself?",
    seoTitle: "Hire a web designer or build it yourself? | HOPI",
    description: "Build a website yourself or have one made? The pros and cons of both routes, what it really costs you in time and money, and when each makes sense.",
    excerpt: "Building it yourself is cheap in money and expensive in time. When does each choice make sense?",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 3,
    body: `With a website builder you can put a website together yourself in a weekend. Or you can have it done by someone who works on websites every day. Both routes can give you a perfectly good website. Which one suits you depends mainly on your time, your patience and what the website needs to achieve.

## Building it yourself: cheap in money, expensive in time

The advantages are clear. You pay a modest amount per month, you can start today and you can change everything yourself whenever you like.

The disadvantages usually only show up along the way:

- **It takes more time than you think.** Not the clicking, but the deciding: which pages, in what order, what goes at the top?
- **Writing the text is hard.** Writing about your own business in your customers' words is a skill in its own right.
- **A template is still a template.** With a bit of bad luck, the competitor down the road has the same one.
- **The technical side stays your problem.** If the website loads slowly or looks odd on a phone, you have to figure it out yourself.
- **Many self-built websites never get finished.** There's always a customer who comes first.

## Having it made: you buy time and experience

If you have your website made, you pay more, but you get something in return: a design that suits the business, a structure that leads visitors to the phone or the form, and someone who takes care of the technical side.

The downside is the risk. You often pay up front and only find out weeks later whether you like the result. That's why it's wise to look at how an agency works and what you get to see before you pay. In [how to choose a web design agency](/en/blog/how-to-choose-a-web-design-agency) you'll find the questions you can ask beforehand.

## When does building it yourself make sense?

- You're just starting out and want to see whether your idea takes off first.
- You have the time and enjoy figuring things out.
- Your website is mainly a business card for people who already know you.

## When is it better to have it done?

- Your website needs to bring in new customers.
- Your hourly rate or your free evening is worth more to you than the price difference.
- You don't want to have to think about it afterwards.

## A sum that helps

Estimate how many hours you'll spend building, writing and maintaining it yourself, and multiply that by what an hour of your time is worth. Put that figure next to the price of having it made. For many business owners the difference is smaller than they expected. What having a website made costs, you can read in [how much does a website cost](/en/blog/how-much-does-a-website-cost).

## The middle way: see first, then decide

The biggest objection to having a website made is that you don't know beforehand what you'll get. At HOPI we solve that by reversing the order. You first see a free design of your own website, with your name and services in it. If you don't like it, it stops there. If you do, you choose a package from {starter}, excluding VAT.

> Still in two minds? [Request a free design](#contact) and put it next to what you would build yourself.`,
    related: ["/en/website-design", "/en/website-design/freelancers", "/en/blog/get-more-customers-from-your-website", "/en/blog/how-much-does-a-website-cost"],
  },
  {
    slug: "what-makes-a-good-business-website",
    category: "aanpak",
    keyword: "what makes a good business website",
    title: "What makes a good business website?",
    seoTitle: "A good business website: a 10-point checklist | HOPI",
    description: "A ten-point checklist for a good business website: from the first five seconds and mobile use to findability and the legal details.",
    excerpt: "Ten points to check your own website against in ten minutes.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 3,
    body: `You don't recognise a good business website by its animations or an expensive photo at the top, but by what a visitor can do with it. With the ten points below you can check your own website in ten minutes. Grab your phone, because that's where most visitors start.

## 1. Within five seconds it's clear what you do

At the top it says in plain words what you do, for whom and where. "Plumber in Zaandam, also available in the evenings" works better than "Welcome to our website".

## 2. It works well on a phone

Text is readable without zooming in, buttons are big enough for a thumb and you never have to scroll sideways. Google also assesses your website based on the mobile version.

## 3. Getting in touch takes one tap

The phone number is tappable, the form is short and the most important button is on every page. The more steps there are, the more visitors drop out along the way.

## 4. It loads quickly

Heavy photos and unnecessary bells and whistles make a website slow. Test it on mobile data, not on the office wifi.

## 5. Every service has its own place

A separate page or a clear block for each service helps both visitors and search engines. Someone searching for "dormer installation" wants to land on a page about dormers, not on a general list.

## 6. You show that you really exist

An address or service area, a Chamber of Commerce (KvK) number, photos of yourself or your team and real examples of your work. Only use reviews from real customers; made-up reviews are misleading and sooner or later they'll be found out.

## 7. The content is correct

Opening hours, prices and services are up to date. Nothing undermines trust as quickly as a Christmas offer in March.

## 8. It's secure

An SSL certificate (the padlock in the address bar) is the bare minimum. Without the padlock, browsers warn visitors that the connection is not secure.

## 9. Google understands what it's about

Every page has its own title and description, one clear main heading and text that mentions your trade and your town. You can read more about this in [getting found on Google](/en/blog/get-found-on-google).

## 10. The legal details are on it

As a business owner you state, among other things, your business name, business address, contact details and Chamber of Commerce (KvK) number. If you collect personal data through a form, you need a privacy statement. If you place tracking cookies, you ask for consent first. If you're unsure what applies to your situation, check with the Chamber of Commerce (KVK) or ask a lawyer.

## How does your website score?

If your website meets seven or more points, the basics are in place. If you're missing more than three, it's worth looking at whether fixing it up still makes sense or whether [a redesign](/en/website-redesign) is the wiser choice.

> Want to see what a website looks like that ticks all these boxes? [Request a free design](#contact) of your own website.`,
    related: ["/en/website-redesign", "/en/website-design", "/en/blog/why-a-mobile-friendly-website-matters", "/en/blog/custom-website-or-template"],
  },
  {
    slug: "how-to-choose-a-web-design-agency",
    category: "aanpak",
    keyword: "how to choose a web design agency",
    title: "How do you choose a web design agency?",
    seoTitle: "How to choose a web design agency: 8 questions | HOPI",
    description: "Eight questions to ask a web design agency before you sign: about ownership, costs, changes, maintenance and what you get to see before you pay.",
    excerpt: "Eight questions to ask before you sign, and the answers to look out for.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 3,
    body: `There are a great many web designers and agencies in the Netherlands, from students with a laptop to agencies with fifty people. From the outside they look alike: all with a slick portfolio and fine promises. You only notice the difference once the project is under way. With these eight questions you find out beforehand.

## 1. What do I get to see before I pay?

Many agencies send a quote and ask for a deposit before a single pixel has been designed. Ask whether you can see a sketch or design beforehand. The more concrete it is, the smaller your risk.

## 2. What exactly is included in the price?

Ask for a list: number of pages, text, photos, forms, integrations. And ask what is *not* included. A low price with lots of extra work is not a low price in the end.

## 3. Who owns the domain name and the content?

The domain name should be registered in your name. Also ask whether you can take your text and photos with you if you ever switch.

## 4. How many changes can I ask for?

A first design is rarely right in one go. Ask how many rounds are included and what an extra round costs.

## 5. What do I pay per month afterwards?

Hosting, maintenance, updates and changes come on top of the build. Ask what the monthly fee covers, how long the contract runs and how you cancel. In [how much does website maintenance cost](/en/blog/how-much-does-website-maintenance-cost) you can read what's usual.

## 6. Who is my point of contact?

Do you get one fixed contact, or a ticket system? And how quickly can you expect an answer?

## 7. Can I see similar work?

Ask for examples from your industry or from businesses of your size. Check whether they are examples of real clients or demos; both tell you something, but not the same thing. An honest agency tells you which is which.

## 8. What do they promise about Google?

Be wary of guarantees such as "number one in Google". Nobody can guarantee positions. A good agency promises a solid technical foundation and explains what you can do yourself. In [getting found on Google](/en/blog/get-found-on-google) you can read what that actually involves.

## Warning signs to watch out for

- Pressure to sign quickly, or discounts that are "only valid today".
- Vague answers to the question of who owns the domain name.
- No clear company details or Chamber of Commerce (KvK) number on the website.
- Reviews you can't find anywhere else.

## How we answer these questions

It would be odd to publish this list without going through it ourselves. At HOPI you first see a free design of your own website (question 1). The packages and what's in them are listed with fixed amounts on the [pricing](/en/pricing) page (questions 2 and 5). We don't guarantee positions in Google (question 8). And the examples on our website are demo designs for fictional businesses; it says so next to them (question 7).

> Want to see for yourself what you get? [Request a free design](#contact).`,
    related: ["/en/website-design", "/en/pricing", "/en/blog/custom-website-or-template", "/en/blog/get-more-customers-from-your-website"],
  },
  {
    slug: "get-found-on-google",
    category: "vindbaarheid",
    keyword: "how to get my business found on google",
    title: "How does your business get found on Google?",
    seoTitle: "Get your business found on Google: 7 steps | HOPI",
    description: "Seven concrete steps for a local business to get found more easily on Google: from your Google Business Profile and real reviews to pages per service.",
    excerpt: "Seven steps for local business owners, the first of which you can take today.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 3,
    body: `When people look for a hairdresser, garage or plumber, they usually type in the trade with a town name, or simply "near me". Google then shows a map with a few businesses and the regular search results below it. You want to be in both places. You won't get there with one trick, but you will with a few things you simply get right.

## 1. Create a Google Business Profile and fill it in completely

The Business Profile is the panel with your name, address, hours and photos that appears next to the search results and in Google Maps. It's free, and for local findability it's the most important thing you can do. Fill in everything: category, opening hours, services, photos and your website.

## 2. Make sure your details are the same everywhere

Your business name, address and phone number must be exactly the same on your website, your Business Profile and other listings. Differences make it unclear to Google whether it's the same business.

## 3. Ask happy customers for a review

Reviews count towards the local results and convince new customers. Just ask for one at the moment a customer is happy, and send the link to your review page along with it. Respond to reviews too, especially the critical ones. Never buy or make up reviews: it's misleading, it breaks Google's rules and it can cost you your profile.

## 4. Give every service its own page

Google shows pages, not websites. A page about "APK inspection" has a better chance of being found for that search than a page listing twenty services one below the other. For each service, write what it is, who it's for, what it costs and how someone books an appointment.

## 5. Mention your trade and your town, in normal sentences

Put what you do and where in the page title, the main heading and the first paragraph. Doing it once, properly, is enough; stuffing a text with keywords reads badly and backfires.

## 6. Make sure your website is fast and works on mobile

Google assesses the mobile version of your website. If it's slow or awkward, visitors drop out, and that doesn't help your position. The checklist in [what makes a good business website](/en/blog/what-makes-a-good-business-website) helps you check this.

## 7. Keep it up

Findability isn't a job that's ever finished. Update your hours around public holidays, add a new photo now and then and expand your website when your services change. A website and profile that are alive do better than ones that stand still.

## What you can expect, and what you can't

If you do these seven things well, you build a solid foundation. How quickly you rise depends on your location, your industry and what competitors do. Think in months rather than days, and be suspicious of anyone who guarantees a position. Nobody can.

## How HOPI helps with this

Every website we make has a solid technical foundation: fast pages, a clear structure and a title for every page. Setting up your Google Business Profile and a local SEO package are available as extras, and within the Growth subscription we keep working on it every month. The details are on [pricing](/en/pricing) and [website maintenance](/en/website-maintenance).

> Want to start with a website that Google can read well? [Request a free design](#contact).`,
    related: ["/en/website-maintenance", "/en/website-design", "/en/blog/get-more-customers-from-your-website", "/en/blog/why-a-mobile-friendly-website-matters"],
  },
  {
    slug: "how-much-does-website-maintenance-cost",
    category: "kosten",
    keyword: "website maintenance cost",
    title: "How much does website maintenance cost?",
    seoTitle: "How much does website maintenance cost per month? | HOPI",
    description: "How much does website maintenance cost? What it covers, why prices vary so much and which questions to ask before you take out a subscription.",
    excerpt: "Why one provider charges a tenner and another hundreds of euros, and what you really need.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readMinutes: 3,
    body: `Ask five providers what website maintenance costs and you'll get five very different amounts, from a tenner to hundreds of euros a month. That's because they don't all mean the same thing by "maintenance". If you know what it covers, you can compare much better.

## What does maintenance cover?

Broadly speaking, there are four layers:

- **Hosting and domain name.** Your website has to live somewhere and be reachable at your own address.
- **Technical.** Security updates, an SSL certificate, backups and keeping an eye on whether the website is up.
- **Content.** Updating opening hours, prices, photos and text.
- **Improving.** Ongoing work on findability, speed and how many enquiries the website brings in.

A subscription of a tenner usually covers only the first layer. A subscription of a few hundred euros often includes all four, including hours from a specialist.

## Why prices vary so much

- **The kind of website.** An online shop with payments and integrations needs more care than a five-page website.
- **Who makes the changes.** Do you make them yourself, or pass them on?
- **How quickly you get help.** Support within a day costs more than "we'll look at it this month".
- **Whether improvement is included.** Monthly work on your findability is done by people, and you see that in the price.

## Can you do maintenance yourself?

Partly. With many systems you can change text yourself. Updates and security are another story: if you skip them for a while, you risk a hacked or broken website. Fixing that is often more expensive than a year of maintenance.

## Signs that maintenance is falling behind

- The browser says your website is "not secure".
- Enquiries through the form no longer arrive in your inbox.
- The website loads noticeably more slowly than it used to.
- The opening hours or prices on the website are no longer correct.
- Nobody knows any more who has access to the website.

If you recognise two or more of these, it's time to sort out maintenance properly, or to look at whether [a redesign](/en/website-redesign) is the wiser choice.

## Questions to ask before you take out a subscription

- What exactly does the monthly fee include, and what doesn't it?
- How many changes are included, and what does an extra one cost?
- How quickly are changes made?
- How long does the contract run and how do you cancel?
- What happens to your website and domain name if you stop?

## What maintenance costs at HOPI

We have three subscriptions, excluding {vat} VAT:

| Subscription | Per month | What's included |
| Hosting & Maintenance | {hosting} | Hosting, SSL, security updates, backups and monitoring |
| Website Care | {care} | Everything above, plus monthly content changes and priority support |
| Growth | {growth} | Everything above, plus monthly SEO improvements and reports |

The subscriptions are meant for websites we have built ourselves. More information is on the [website maintenance](/en/website-maintenance) page.

> Don't have a website yet, or is your current one due for replacement? [Request a free design](#contact).`,
    related: ["/en/website-maintenance", "/en/pricing", "/en/blog/how-much-does-a-website-cost", "/en/website-redesign"],
  },
  {
    slug: "what-to-put-on-a-restaurant-website",
    category: "branches",
    keyword: "what should be on a restaurant website",
    title: "What should be on a restaurant website?",
    seoTitle: "What should be on a restaurant website? | HOPI",
    description: "A checklist for your restaurant website: the menu as text, quick reservations, up-to-date opening hours, allergens, real photos and your Google profile.",
    excerpt: "A checklist for restaurants: from a readable menu to booking in a few taps.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 7,
    image: { src: "/site/work/restaurant-d-1440.webp", alt: "HOPI demo design for a restaurant website (Vesper, a fictional restaurant)", width: 1440, height: 900 },
    body: `A restaurant website should at least have your menu as normal text, a way to book directly, up-to-date opening hours, your address with directions and photos that show what the place really looks like. On top of that, you tell guests how they can get information about allergens, and you make sure everything works on a phone, because that's where most people look when they're searching for a restaurant. Below we go through the points one by one, so you can check your own website or know what to ask for when you have one made.

## What does a guest look for on your website?

Almost nobody reads a restaurant website from top to bottom. A guest comes with a question: are they open tonight, what's on the menu, roughly what does it cost, can I book and where do I park? Often they're already out on the street or on the sofa with their phone. Every question that isn't answered within a few taps is a reason to try the next restaurant in the search results.

That's why the top of the page should say in one sentence what kind of restaurant you are and where: "Italian restaurant on the harbour in Harderwijk, open Wednesday to Sunday". Directly below that, the button to book. Atmosphere matters, but a big video that has to load first while the guest doesn't yet know where they are costs you bookings.

## The checklist: what should be on a restaurant website

- **Your menu as text on the page.** No PDF and no photo of the menu. You'll read why below.
- **Booking in a few taps.** A button that appears on every page and goes straight to your reservation system or form. If you only take bookings by phone, make the number tappable.
- **Up-to-date opening hours.** Including kitchen hours if they differ, and adjusted hours around public holidays and holiday periods.
- **Address, directions and parking.** A map, a link to directions and a sentence about parking or the nearest station.
- **Real photos.** Of your dishes, your dining room and your terrace. No stock photo of a pasta you don't serve.
- **Information about allergens.** Where guests can find it or how they can ask for it.
- **Prices.** On the menu, or at least an indication per course or set menu. Guests want to know beforehand whether you fit their budget.
- **Groups and packages.** If you have a room for parties or a lunch for businesses, give it its own block or page.
- **Contact and company details.** Phone number, email address and your Chamber of Commerce (KvK) number.

## Why your menu belongs on the site as normal text

Many restaurants put their menu on the website as a PDF. Understandable, because the file already exists. On a phone, though, a PDF is awkward: zooming in, scrolling sideways and sometimes downloading it first. And such a file is easy to forget to update, so it ends up listing dishes that have been off the menu for months.

A menu as normal text (HTML) reads comfortably on any screen, loads quickly and also works with the screen readers that blind and partially sighted guests use. Search engines can read the text, so someone searching for "vegetarian restaurant" plus your town is more likely to end up on a page where your vegetarian dishes are actually listed. In your website's structured data you can also point to your menu; Google describes a menu property for this in its documentation on local businesses.

A few tips for the menu itself:

- For each dish, give the name, a short description and the price.
- Mark vegetarian and vegan dishes the same way everywhere.
- If your menu changes often, show that it's a sample menu and add the date.

## Allergens: what the rules require

Guests with an allergy want to know beforehand whether they can eat safely with you. In the Netherlands, as a hospitality business you must be able to provide information about the fourteen allergens named in the law, including for dishes you prepare yourself. According to Royal Dutch Hospitality (Koninklijke Horeca Nederland), this may be done verbally or in writing. If you give the information verbally, it must also be available in writing or digitally, for your staff and for the NVWA, the Dutch food safety authority. In Belgium similar rules apply, which the FAVV, the Belgian food safety agency, explains.

Your website doesn't have to be the only place where that information is, but it does help. A short line by the menu, such as "Have an allergy? Just ask us for the allergen menu", removes doubt before someone books. If you offer online ordering or takeaway, find out what applies in that situation, because then the guest chooses their dish before they speak to you.

> This article is not legal advice. If you're unsure what applies to your business, check with your industry association or the NVWA.

## Your website and your Google profile belong together

Many guests see your Google Business Profile before your website: the panel with your name, stars, photos and opening hours in Google Search and Maps. Google lets restaurants show their menu and receive bookings there, among other things. Make sure the details in that profile are exactly the same as those on your website. If Google says you're open on Monday and your website says you're closed, the guest doesn't know who to believe.

A handy way to split it: the profile is the shop window, your website is the restaurant itself. The profile shows at a glance that you exist and are open. Your website gives room to the full menu, the story of your kitchen, group packages and the booking button. How to climb higher in the local results, you can read in [getting found on Google](/en/blog/get-found-on-google).

## Mobile, fast and easy to update

Test your website the way a guest uses it: open it on your own phone, on mobile data, and try to book a table for four within half a minute. If you can't do that without zooming in or searching, that's your first point to improve. Why this weighs so heavily, for Google too, you can read in [why a mobile-friendly website matters](/en/blog/why-a-mobile-friendly-website-matters).

Also look at how easily you can change things. A restaurant changes more often than most businesses: a new seasonal menu, a week closed in summer, a Christmas menu. Agree on how those changes will work before the website goes live, so that your menu and hours are still correct a year from now.

## What a restaurant website from HOPI looks like

On our website you'll find [Vesper, a demo design for a fictional restaurant](/en/work/restaurant). It shows how the points above come together: the menu as text, a booking button that's always in view and opening hours you don't have to search for. It's an example, not a client. What we make for restaurants, and what extras such as a digital menu or a link to your reservation system involve, is on the page [website design for your restaurant](/en/website-design/restaurant).

Want to know what this would look like for your restaurant? We first make a free design of your own website, with your own name and opening hours in it. Only if you like it do you choose a package.

> [Request a free design](#contact) and view your own restaurant on your phone.`,
    related: ["/en/website-design/restaurant", "/en/website-design/hospitality", "/en/work/restaurant", "/en/blog/get-more-customers-from-your-website"],
    sources: [
      { label: "KHN: What does the allergen legislation mean for me? (Dutch)", url: "https://khn.nl/kennis/wat-betekent-de-wetgeving-allergenen-voor-je" },
      { label: "FAVV: Questions and answers on allergen information, Belgium (Dutch)", url: "https://favv-afsca.be/sites/default/files/2023-08/2015-07-14_QenAallergenen_nl_corr.pdf" },
      { label: "Google Business Profile for restaurants (Dutch)", url: "https://business.google.com/nl/business-profile/restaurants/" },
      { label: "Google Search Central: structured data for local businesses", url: "https://developers.google.com/search/docs/appearance/structured-data/local-business" },
    ],
  },
  {
    slug: "why-a-mobile-friendly-website-matters",
    category: "vindbaarheid",
    keyword: "why is a mobile friendly website important",
    title: "Why does a mobile-friendly website matter?",
    seoTitle: "Why does a mobile-friendly website matter? | HOPI",
    description: "Google assesses your website on its mobile version, and your customers look on their phone first. What that means and how to test your site in ten minutes.",
    excerpt: "Google looks at the mobile version of your website. What that means and how to test it yourself.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 6,
    body: `A mobile-friendly website matters for two reasons: your customers search and compare on their phones, and Google uses the mobile version of your website to index and rank it. If your website works badly on a phone, visitors drop out and Google sees a worse version of your business. A website that works well on mobile is therefore not an extra but the foundation.

## What mobile-first indexing means

Google used to look mainly at the desktop version of a website. That has been turned around. The Google Search Central documentation states that Google uses the mobile version of a site's content, crawled with a smartphone crawler, for indexing and ranking. This is called mobile-first indexing. In 2023 Google announced that the switch had been completed for the whole web.

What that means in practice:

- **What isn't on your mobile version barely counts.** If you hide part of your text, your services or your opening hours on a phone to save space, Google misses them too.
- **The same content on every screen.** Google recommends showing the same content, headings, images and structured data on mobile as on desktop.
- **Don't load important content only after a tap.** Text that only appears when someone taps or swipes somewhere may be missed by Google.

A responsive website, which adapts to every screen and shows the same content everywhere, prevents most of these problems automatically.

## Why your customers notice first

Google aside: think about how you look for a business yourself. You're standing in the kitchen with a leaking tap, or you're on the sofa looking for a restaurant for Saturday. You pick up your phone. A website that's small, slow or awkward at that moment gets closed within a few seconds, and you try the next one.

On a phone the screen is smaller, and so is people's patience. Every extra step weighs more heavily: zooming in to read a phone number, a menu that won't open, a form with ten fields. On a laptop you can still work around that. On a phone you can't.

## Where things often go wrong on mobile

### Buttons and links that are too small

A finger is less precise than a mouse. The WCAG 2.2 accessibility guidelines ask for clickable elements of at least 24 by 24 CSS pixels, or enough space around them. As a stricter standard they mention 44 by 44, and many designers stick to that size for important buttons. Two small links right below each other are a gamble on a phone.

### A slow website

On mobile data you notice heavy photos, videos and scripts straight away. Google measures visitors' experience with the Core Web Vitals. According to web.dev, a page is good if the largest element is on screen within 2.5 seconds (LCP), the page responds to a tap within 200 milliseconds (INP) and the content barely shifts while loading (a CLS of 0.1 or less). These thresholds apply to both mobile and desktop, but on a phone they're the hardest to meet.

### Pop-ups that cover everything

A cookie notice, a newsletter window and a chat button all at once leave little of your page on a small screen. Stick to what's really needed and make sure it's easy to tap away.

### Text that's too small or too wide

If visitors have to zoom in or scroll sideways to read a sentence, the page wasn't made for mobile. Many designers use around 16 pixels for body text, with lines that stay within the screen.

## What you can test yourself, in ten minutes

You don't need any technical knowledge to check your own website. Grab your phone and do this:

- **Turn off your wifi** and open your website on mobile data. How long does it take before you see something?
- **Call yourself through the website.** Is your phone number tappable, or do you have to type it in?
- **Fill in your own contact form** with your thumb. Does the message arrive?
- **Look up your opening hours and address.** How many taps do you need?
- **Turn your phone** to landscape once. Does everything stay neatly in place?
- **Let someone else try it**, preferably someone who doesn't know your website.

| Test | Good sign | Bad sign |
| Loading on mobile data | Within a few seconds you can see where you are | A white screen or a spinning circle |
| Calling | One tap on the number | Typing in or searching for the number |
| Form | A few fields, big enough for your thumb | Lots of required fields and small boxes |
| Menu | Opens and closes smoothly | Falls over the text or won't close again |

If you want figures, enter your address in PageSpeed Insights, Google's free tool. It shows the Core Web Vitals and points out where things slow down. In Google Search Console you can also see whether Google has problems fetching and indexing your pages.

## Designing for mobile is different from shrinking desktop

A common mistake is to design a website for a large screen first and then see how it fits on a phone. Columns then stack in an order nobody planned, and your most important button suddenly ends up at the bottom. It's better to start with the smallest screen: what should a visitor see first there, and what can go lower down? On a larger screen you then add space.

Not sure whether your current website can still be saved? Sometimes a website can be made to work well on mobile with a few adjustments. If the structure itself is the problem, then [redesigning your website](/en/website-redesign) is often quicker and cheaper than repairing it again and again. A broader checklist is in [what makes a good business website](/en/blog/what-makes-a-good-business-website).

## How HOPI handles mobile

Every website we make is mobile-first: we start with the phone. We test every page on phone, tablet and desktop: the layout, the links, the forms and the basics of speed. Only when everything is right do you get to see the design. You can read more about how that works on [website design](/en/website-design).

> Curious what your business looks like on a phone? [Request a free design](#contact) and view it on your own screen.`,
    related: ["/en/website-design", "/en/website-redesign", "/en/blog/what-makes-a-good-business-website", "/en/blog/get-found-on-google"],
    sources: [
      { label: "Google Search Central: Mobile site and mobile-first indexing best practices", url: "https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" },
      { label: "Google Search Central Blog: Mobile-first indexing has landed (2023)", url: "https://developers.google.com/search/blog/2023/10/mobile-first-is-here" },
      { label: "web.dev: How the Core Web Vitals metrics thresholds were defined", url: "https://web.dev/articles/defining-core-web-vitals-thresholds" },
      { label: "W3C: Understanding WCAG 2.2, Target Size (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
    ],
  },
  {
    slug: "custom-website-or-template",
    category: "aanpak",
    keyword: "custom website vs template",
    title: "Custom website or template: what's the difference?",
    seoTitle: "Custom website or template: the difference | HOPI",
    description: "What's the difference between a custom website and a template? An honest comparison of cost, turnaround time and freedom, and when each one fits.",
    excerpt: "An honest comparison of cost, time and freedom, plus the in-between option that often fits best.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 6,
    body: `The difference between a custom website and a template lies in where the design comes from. With a template you start with a ready-made design that others use too, and you fill it with your own text and photos. With a custom website, the design and often the technical build are made specifically for your business. A template is quicker and cheaper; custom work gives you more freedom but costs more time and money. In between there are options that work well for many business owners.

## What exactly is a template?

A template, also called a theme, is a pre-made design. Website builders and systems such as WordPress have thousands of them: for hairdressers, builders, restaurants. You pick one, replace the sample text and photos, and your website is up.

That works fine as long as your business fits the template. It gets tricky when it doesn't. A restaurant template assumes a menu and a booking button; if you run a catering business that works with quotes, you end up making do. On top of that, many templates contain more than you need: sliders, animations and features that you switch off, but whose code often still loads.

## What is a custom website?

With custom work, a designer starts with a blank page. First comes the question of what your visitors want to do and what makes your business different, then the design, and often a developer builds the whole thing specifically for you. Anything is possible: your own booking process, a link with your scheduling, a structure that fits your customers exactly.

That freedom comes at a price. There are conversations, sketches and feedback rounds first, so the turnaround time quickly runs to weeks or months. And because everything is unique, you're often dependent on whoever built it for any changes.

## The difference between custom and a template at a glance

| Aspect | Template | Custom |
| Cost | Low, sometimes just a subscription | High, because everything is made for you |
| Turnaround time | Days | Weeks to months |
| Unique design | No, others use the same one | Yes |
| Unusual requirements | Possible to a limited extent | Anything is possible |
| Speed and technical quality | Varies, often lots of unnecessary code | As good as the builder |
| Changes later on | Often something you can do yourself | Often through the builder |

Two things stand out. Custom is not automatically better: a badly built custom site is slower and more awkward than a good template. And a template is not automatically cheap: if you put lots of hours into making a theme fit that wasn't designed for it, you still pay, in money or in time.

## When is a template enough?

- You're just starting out and want to get online first.
- Your business closely resembles the example in the template, such as a hair salon with a few services and a booking button.
- You don't need any special features.
- You don't mind if another business looks roughly the same.

If you're doing it yourself, check a template for speed and mobile use before you choose. The demo always looks good. Test it on your own phone and with PageSpeed Insights, which measures the Core Web Vitals, for which web.dev gives clear thresholds. What else building it yourself costs you, you can read in [hire a web designer or build it yourself](/en/blog/hire-a-web-designer-or-build-it-yourself).

## When do you choose custom?

- You need features that aren't standard anywhere, such as your own booking process or a link with your software.
- You want to stand out in a busy market with a design that's truly your own.
- Your website is your most important sales channel and every extra enquiry counts.
- You have the budget and the time for a process of several weeks.

## The in-between option: a design of our own, filled in for your business

Between an off-the-shelf template and fully custom work there's an option you see more and more often: an agency that works with a limited number of its own designs and fills them in for each business. That's how HOPI works too, and we're happy to explain exactly what it is and isn't.

We have twelve website designs that we designed ourselves, by hand. They're not in a theme store, so you don't share your website with hundreds of businesses that bought the same theme. Your website gets one of those designs and is filled with your name, services, opening hours and text. We then finalise the text and photos together with you.

What it isn't: fully custom work from a blank page. The basic structure of the design is fixed, and that's exactly why it can be done quickly and for a fixed price. If you need more, such as a fully custom design or a reservation or booking system, that's what the Premium package is for. We make online shops and web applications on a quotation basis. All prices exclude {vat} VAT.

| Route at HOPI | What you get | Price |
| Our own design, filled in for you | A one-page or complete website in one of our twelve designs | {starter} or {business} |
| Custom designed | With a reservation or booking system, for example | {premium} |
| Online shop or web application | Depends on what you need | On quotation |

## Which one suits you?

Ask yourself three questions. What does your website need to do that a standard site can't? How much time do you have before it needs to be online? And how much does it matter if another business looks roughly the same? If you answer "nothing special" to the first question, you rarely need fully custom work. If you say "a lot" to the last question, you don't want an off-the-shelf template.

It's easiest to decide when you have something concrete in front of you. On [our work](/en/work) you'll find demo designs for fictional businesses, so you can already have a look at the designs, and the packages are on [pricing](/en/pricing). Even more concrete is your own business: we first make a free design of your own website, so you can see whether it fits before you choose anything.

> [Request a free design](#contact) and judge for yourself whether it's enough you.`,
    related: ["/en/website-design", "/en/pricing", "/en/work", "/en/blog/hire-a-web-designer-or-build-it-yourself"],
    sources: [
      { label: "web.dev: How the Core Web Vitals metrics thresholds were defined", url: "https://web.dev/articles/defining-core-web-vitals-thresholds" },
      { label: "PageSpeed Insights (Google)", url: "https://pagespeed.web.dev/" },
    ],
  },
  {
    slug: "get-more-customers-from-your-website",
    category: "vindbaarheid",
    keyword: "how to get more customers from your website",
    title: "How do you get more customers from your website?",
    seoTitle: "More customers from your website: here's how | HOPI",
    description: "How do you get more customers from your website? A clear offer, contact in one tap, trust through real information, local visibility and measuring results.",
    excerpt: "More visitors only help if they also call or email. Here's how to make sure they do.",
    published: "2026-11-28",
    modified: "2026-11-28",
    readMinutes: 6,
    body: `You get more customers from your website by doing two things at once: making sure the right people find you, and making sure they then get in touch. That second part is often forgotten. A clear offer, contact in one tap and real information that builds trust often deliver more than extra visitors. After that, you measure what works, so you're not improving things on gut feeling.

## Start with the visitors you already have

When they think of "more customers from your website", most business owners think of more visitors. Logical, but not always the quickest route. A worked example: say a hundred people a month look at your website and two of them call. If you get that to four, you double your enquiries without a single extra visitor. Marketers call this conversion: the share of your visitors who do what you hope they'll do.

Why do visitors drop out? Usually for one of three reasons: they don't understand quickly enough what you do, they can't find how to get in touch, or they don't quite trust it. You tackle those three one by one below.

## 1. Make clear in one sentence what you do, for whom and where

At the top of your homepage a visitor decides whether to stay. "Welcome to Jansen Installatietechniek" tells them nothing. "Boiler broken? We come out in Amersfoort and the surrounding area, often the same day" tells them what they want to know.

A strong offer answers three questions:

- **What do you provide?** In your customer's words, not in jargon.
- **For whom?** Private customers, businesses, a particular region or industry.
- **Why you?** Something concrete: quickly on site, a fixed price, a specialism, open on Saturdays.

Below that, list your main services, each with its own block or page. Someone searching for one specific service wants to read about that, not about everything you do.

## 2. Getting in touch takes one tap

The more steps there are between interest and contact, the more people drop out along the way. On a phone that counts double.

- **A tappable phone number**, at the top and on every page.
- **One clear button** with a verb: "Book an appointment", "Request a quote", "Reserve a table".
- **A short form.** Name, phone or email and a question. Every extra required field costs you enquiries.
- **WhatsApp**, if you really do reply to it quickly.
- **A promise about your response time**, such as "We reply within one working day", if you can keep it.

Test it yourself: how many taps do you need on your phone to call your own business? Why this weighs so heavily, you can read in [why a mobile-friendly website matters](/en/blog/why-a-mobile-friendly-website-matters).

## 3. Win trust with real information

A visitor who doesn't know you looks for proof that you exist and do good work. That proof has to be real.

- **Photos of yourself, your team and your work.** A real photo of your van or your workshop says more than a glossy stock photo.
- **Examples of your work**, with a short explanation of what the request was and what you did.
- **Real reviews**, for example from your Google Business Profile, under the name the customer used themselves.
- **Concrete details**: your address or service area, your Chamber of Commerce (KvK) number and your opening hours.
- **Clarity about prices**, even if it's just an indication or a "from" price.

Never make up reviews, customers or figures. It's tempting to write a few enthusiastic quotes when you don't have many reviews yet, but fake reviews are explicitly banned in the Netherlands and the ACM, the Dutch consumer authority, takes action against them. Besides, customers often see through them, and then you lose more than you gained. If you don't have many reviews yet, simply ask happy customers for one, at the moment they're happy.

## 4. Make sure people nearby find you

For most local businesses, new customers come through Google: someone searches for your trade plus a town name, or "near me". According to Google, local results are mainly determined by relevance, distance and prominence. You can't change distance, but you can change the other two.

| What | Why it helps |
| A fully completed Google Business Profile | Google uses the information in your profile for the local results |
| The same name, address and phone number everywhere | Google knows for sure that it's the same business |
| A page per service, with your town in it | You match what people actually type in |
| Reviews, and your replies to them | They count towards your prominence and convince new customers |

You can read more about this in [getting found on Google](/en/blog/get-found-on-google). Do mind the order, though: first make your website convincing, and only then send more visitors to it. Otherwise you pay, in time or advertising budget, for visitors who drop out anyway.

## 5. Measure what works

Without measuring, you don't know whether a change made a difference. Two free Google tools are enough to start with:

- **Google Search Console** shows which searches your website appears for, how often people click on it and whether Google sees problems with your pages.
- **Google Analytics 4 (GA4)** shows how many visitors you have, where they come from and what they do. Mark clicks on your phone number, your WhatsApp button and submitted forms as a key event, so you can see how many enquiries your website brings in.

If you use GA4, make sure your cookie notice and privacy statement are in order too. Then look at the same few figures once a month: the number of enquiries, where they came from and which pages work best. Change one thing at a time, so you know what the effect was. And simply ask new customers how they found you. That one little question sometimes tells you more than a dashboard.

## Where do you start?

You don't have to do everything at once. A good order:

- Rewrite the top of your homepage into one clear sentence.
- Make your phone number tappable and your form shorter.
- Put real photos and real reviews on your website.
- Fill in your Google Business Profile completely.
- Set up GA4 and Search Console and see after a month what has changed.

If your current website is far from these points, starting again is often quicker than fixing everything separately. Every HOPI website starts from this foundation: a clear heading, contact in one tap, pages that Google can read well and only information that's correct. Setting up your Google Business Profile can be added as an extra. You can read more on [website design](/en/website-design) and [website redesign](/en/website-redesign).

> Want to see what your website looks like with this foundation? [Request a free design](#contact). If you don't like it, you pay nothing.`,
    related: ["/en/website-design", "/en/website-redesign", "/en/blog/get-found-on-google", "/en/blog/why-a-mobile-friendly-website-matters"],
    sources: [
      { label: "Google Business Profile Help: Improve your local ranking on Google (Dutch)", url: "https://support.google.com/business/answer/7091?hl=nl" },
      { label: "ACM: Stricter rules for online sellers (ban on fake reviews) (Dutch)", url: "https://www.acm.nl/nl/publicaties/acm-strengere-regels-voor-online-verkopers" },
      { label: "Google Analytics Help: Mark events as key events (Dutch)", url: "https://support.google.com/analytics/answer/13128484?hl=nl" },
    ],
  },
];

export const articleBySlugEn = (slug: string) => ARTICLES_EN.find((a) => a.slug === slug);
