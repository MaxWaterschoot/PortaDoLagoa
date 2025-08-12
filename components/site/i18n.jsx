"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
const I18nCtx = createContext({ lang: "nl", setLang: () => {}, t: (k) => k });
const messages = {
  nl: {
    "nav.home": "Home",
    "nav.rooms": "Kamers",
    "nav.wellness": "Wellness",
    "nav.wine": "Wijn",
    "nav.gallery": "Galerij",
    "nav.pricing": "Prijzen",
    "nav.location": "Locatie",
    "nav.contact": "Contact",
    "badge.bb": "B&B aan de kust",
    "cta.rooms": "Ontdek onze kamers",
    "cta.book": "Direct boeken",
    "cta.availability": "Beschikbaarheid",
    "cta.bookNow": "Boek nu",
    "cta.pricing": "Prijzen",
    "hero.tagline":
      "Moderne B&B villa met zeezicht, wellness, relax & uitstekende rode wijn",
    "rooms.title": "Kamers",
    "rooms.subtitle":
      "Design, comfort en rust — kies de kamer die bij je past.",
    "wellness.title": "Wellness & relax",
    "wellness.p1":
      "Laat de dag wegsmelten in onze sauna en de rust rond het zwembad.",
    "wellness.l1": "✔ Privé sauna",
    "wellness.l2": "✔ Handdoeken & badjassen",
    "wellness.l3": "✔ Aromatherapie op aanvraag",
    "wellness.l4": "✔ Message op aanvraag",
    "wellness.l5": "✔ Fitness",
    "wine.title": "Wijnmomenten",
    "wine.p1":
      "Liefde voor goede rode wijn zit in ons DNA. Proef lokale klassiekers en verrassende ontdekkingen — perfect bij zonsondergang.",
    "wine.l1": "✔ rondgang in eigen beperkte wijngaard",
    "wine.l2": "✔ Proef andere wijn ga",
    "gallery.title": "Galerij",
    "pricing.title": "Prijzen",
    "pricing.period": "Periode",
    "pricing.estimate": "Geschatte totaalprijs",
    "pricing.nights": "nachten",
    "pricing.seasons": "Seizoenen: laag €129 · midden €159 · hoog €189",
    "reviews.title": "Reviews",
    "reviews.source": "Bron",
    "location.title": "Locatie",
    "location.openMaps": "Open in Maps",
    "contact.title": "Boeken & Contact",
    "contact.subtitle":
      "Vragen over beschikbaarheid of speciale wensen? Laat een bericht achter — we antwoorden snel.",
    "contact.tabs.book": "Boeken",
    "contact.tabs.contact": "Contact",
    "form.first": "Voornaam",
    "form.last": "Achternaam",
    "form.stay": "Verblijf",
    "form.selectRange": "Selecteer check-in & check-out",
    "form.email": "E-mail",
    "form.phone": "Telefoon",
    "form.notes": "Opmerkingen (optioneel)",
    "form.send": "Verstuur aanvraag",
    "why.title": "Waarom kiezen voor Porta da Lagoa?",
    "why.l1": "✔ Intieme B&B met moderne afwerking",
    "why.l2": "✔ Wellnessfaciliteiten en wijnselectie",
    "why.l3": "✔ Zicht op lagone en strand dichtbij",
    "why.l4": "✔ Vers en lokaal ontbijt",
    "why.l5": "✔ Belgische uitbaters Tom & Isabelle",
    "arrangements.title": "Speciale arrangementen",
    "arrangements.body":
      "Verjaardagsverrassing? Romantische getaway? We denken graag mee.",
    "footer.allrights": "Alle rechten voorbehouden.",
  },
  en: {
    "nav.home": "Home",
    "nav.rooms": "Rooms",
    "nav.wellness": "Wellness",
    "nav.wine": "Wine",
    "nav.gallery": "Gallery",
    "nav.pricing": "Pricing",
    "nav.location": "Location",
    "nav.contact": "Contact",
    "badge.bb": "B&B by the coast",
    "cta.rooms": "Explore our rooms",
    "cta.book": "Book now",
    "cta.availability": "Availability",
    "cta.bookNow": "Book now",
    "cta.pricing": "Pricing",
    "hero.tagline": "Modern villa with sea view, wellness & excellent red wine",
    "rooms.title": "Rooms",
    "rooms.subtitle":
      "Design, comfort and calm — pick the room that suits you.",
    "wellness.title": "Wellness",
    "wellness.p1":
      "Melt the day away in our sauna & hot tub. Reserve by the hour for complete privacy.",
    "wellness.l1": "✔ Private sauna & hot tub",
    "wellness.l2": "✔ Towels & bathrobes",
    "wellness.l3": "✔ Aromatherapy on request",
    "wine.title": "Wine moments",
    "wine.p1":
      "A love for great red wine is in our DNA. Taste local classics and surprising finds — perfect at sunset.",
    "wine.l1": "✔ Local selection",
    "wine.l2": "✔ House label",
    "wine.l3": "✔ Pairing tips",
    "gallery.title": "Gallery",
    "pricing.title": "Pricing",
    "pricing.period": "Period",
    "pricing.estimate": "Estimated total",
    "pricing.nights": "nights",
    "pricing.seasons": "Seasons: low €129 · mid €159 · high €189",
    "reviews.title": "Reviews",
    "reviews.source": "Source",
    "location.title": "Location",
    "location.openMaps": "Open in Maps",
    "contact.title": "Booking & Contact",
    "contact.subtitle":
      "Questions about availability or special requests? Leave a message — we reply quickly.",
    "contact.tabs.book": "Book",
    "contact.tabs.contact": "Contact",
    "form.first": "First name",
    "form.last": "Last name",
    "form.stay": "Stay",
    "form.selectRange": "Select check-in & check-out",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.notes": "Notes (optional)",
    "form.send": "Send request",
    "why.title": "Why choose Porta da Lagoa?",
    "why.l1": "✔ Intimate B&B with modern finish",
    "why.l2": "✔ Wellness facilities and wine selection",
    "why.l3": "✔ Sea view and beach nearby",
    "why.l4": "✔ Fresh and local breakfast",
    "arrangements.title": "Special packages",
    "arrangements.body":
      "Birthday surprise? Romantic getaway? We’re happy to help.",
    "footer.allrights": "All rights reserved.",
  },
  pt: {
    "nav.home": "Início",
    "nav.rooms": "Quartos",
    "nav.wellness": "Bem-estar",
    "nav.wine": "Vinho",
    "nav.gallery": "Galeria",
    "nav.pricing": "Preços",
    "nav.location": "Localização",
    "nav.contact": "Contacto",
    "badge.bb": "B&B à beira-mar",
    "cta.rooms": "Ver quartos",
    "cta.book": "Reservar",
    "cta.availability": "Disponibilidade",
    "cta.bookNow": "Reservar agora",
    "cta.pricing": "Preços",
    "hero.tagline":
      "Moradia moderna com vista mar, bem-estar e excelente vinho tinto",
    "rooms.title": "Quartos",
    "rooms.subtitle":
      "Design, conforto e tranquilidade — escolha o quarto ideal.",
    "wellness.title": "Bem-estar",
    "wellness.p1":
      "Relaxe na nossa sauna e jacuzzi. Reserve por hora para total privacidade.",
    "wellness.l1": "✔ Sauna & jacuzzi privados",
    "wellness.l2": "✔ Toalhas & roupões",
    "wellness.l3": "✔ Aromaterapia sob pedido",
    "wine.title": "Momentos de vinho",
    "wine.p1":
      "Adoramos bons tintos. Prove clássicos locais e descobertas — perfeitos ao pôr-do-sol.",
    "wine.l1": "✔ Seleção local",
    "wine.l2": "✔ Rótulo da casa",
    "wine.l3": "✔ Dicas de harmonização",
    "gallery.title": "Galeria",
    "pricing.title": "Preços",
    "pricing.period": "Período",
    "pricing.estimate": "Estimativa total",
    "pricing.nights": "noites",
    "pricing.seasons": "Épocas: baixa €129 · média €159 · alta €189",
    "reviews.title": "Avaliações",
    "reviews.source": "Fonte",
    "location.title": "Localização",
    "location.openMaps": "Abrir no Maps",
    "contact.title": "Reservas & Contacto",
    "contact.subtitle":
      "Dúvidas de disponibilidade ou pedidos especiais? Envie uma mensagem — respondemos rápido.",
    "contact.tabs.book": "Reservar",
    "contact.tabs.contact": "Contacto",
    "form.first": "Nome",
    "form.last": "Apelido",
    "form.stay": "Estadia",
    "form.selectRange": "Escolha check-in & check-out",
    "form.email": "E-mail",
    "form.phone": "Telefone",
    "form.notes": "Observações (opcional)",
    "form.send": "Enviar pedido",
    "why.title": "Porquê a Porta da Lagoa?",
    "why.l1": "✔ B&B acolhedor com acabamento moderno",
    "why.l2": "✔ Bem-estar e seleção de vinhos",
    "why.l3": "✔ Vista mar e praia perto",
    "why.l4": "✔ Pequeno-almoço fresco e local",
    "arrangements.title": "Pacotes especiais",
    "arrangements.body":
      "Surpresa de aniversário? Escapadinha romântica? Conte connosco.",
    "footer.allrights": "Todos os direitos reservados.",
  },
};
export function I18nProvider({ children }) {
  const [lang, setLang] = useState("nl");
  useEffect(() => {
    try {
      const raw = localStorage.getItem("lang");
      if (raw) setLang(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("lang", JSON.stringify(lang));
    } catch {}
  }, [lang]);
  const t = useCallback(
    (key) => {
      const pack = messages[lang] || messages["nl"];
      return (pack && pack[key]) || messages["nl"][key] || key;
    },
    [lang]
  );
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}
export function useI18n() {
  return useContext(I18nCtx);
}
