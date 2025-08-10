# Porta da Lagoa — Next.js + Tailwind + **shadcn/ui** (JavaScript, App Router)

**React + Tailwind + shadcn/ui (JS-only)** met animaties, pricing, Facebook reviews en form-validatie. Klaar om te runnen.

## Starten
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Facebook Graph API (reviews)
Maak `.env.local` aan:
```
FACEBOOK_PAGE_ID=61575830455388
FACEBOOK_ACCESS_TOKEN=EAAB...   # Page access token
```
Zonder env-vars krijg je automatisch **mock** reviews.

## shadcn/ui CLI (optioneel)
Je kunt de officiële generator gebruiken of extra components toevoegen:
```bash
npx shadcn-ui@latest add button card input textarea badge tabs separator
```

## Features
- **SEO/OG + favicon**
- **Pricing/seizoenen** (kalender + per-nacht breakdown)
- **Animaties & duidelijke hovers** (framer-motion + hover states, inverted CTA blijft leesbaar)
- **Form-validatie**: required velden + datumchecks (niet in verleden, checkout > checkin)
- **Dark/Light** toggle + **persist** (localStorage)
- **Smooth scroll** + sticky header
- **Galerij** en **Rooms** kaarten met hover/scale

Veel succes! Als iets nog 1-op-1 moet matchen met jouw voorbeeld, zeg welke secties/indeling ik exact moet kopiëren en ik pas het meteen aan.


## Fixes in this build
- Volledige **shadcn tokens** in CSS → correcte contrasten (knoppen/invoer/kaarten).
- **Button** geüpdatet naar officiële shadcn-variant (CSS-variabelen).
- Reviews krijgen nu **fallback content** als de API niets terugstuurt.
