"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Waves,
  Wine,
  Star,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Bath,
  CalendarCheck,
  ChevronRight,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const SITE = {
  name: "Porta da Lagoa",
  tagline: "Moderne villa met zeezicht, wellness & uitstekende rode wijn",
  facebook: "https://www.facebook.com/profile.php?id=61575830455388",
  phone: "+32 470 00 00 00",
  email: "info@portadalagoa.example",
  address: "Rua da Lagoa 12, 2500-000, Portugal",
  heroImage:
    "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?q=80&w=1600&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505692794403-34cb7f24b532?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505691723518-36a5ac3b2c5c?q=80&w=1200&auto=format&fit=crop",
  ],
};
const ROOMS = [
  {
    id: "suite-ocean",
    name: "Ocean Suite",
    desc: "Ruime suite met panoramisch zeezicht, kingsize bed en privéterras.",
    perks: ["Zeezicht", "Privéterras", "Airco", "Ontbijt inbegrepen"],
    price: 189,
    img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2c5c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "villa-deluxe",
    name: "Villa Deluxe",
    desc: "Elegante kamer met moderne afwerking, regendouche en bureau.",
    perks: ["Kingsize bed", "Regendouche", "Snelle wifi", "Smart TV"],
    price: 149,
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "wellness-loft",
    name: "Wellness Loft",
    desc: "Knusse loft met toegang tot sauna & jacuzzi, ideaal voor twee.",
    perks: ["Sauna toegang", "Jacuzzi", "Minibar", "Late check-out"],
    price: 169,
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1400&auto=format&fit=crop",
  },
];

function usePersisted(key, initial) {
  const [s, setS] = useState(initial);
  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setS(JSON.parse(raw));
  }, [key]);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(s));
  }, [key, s]);
  return [s, setS];
}

function ThemeLangBar() {
  const [theme, setTheme] = usePersisted("theme", "light");
  const [lang, setLang] = usePersisted("lang", "nl");
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
      <div className="inline-flex items-center gap-1">
        <Globe className="h-4 w-4" />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="nl">NL</option>
          <option value="en">EN</option>
          <option value="pt">PT</option>
        </select>
      </div>
    </div>
  );
}

function Header() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Kamers", href: "#rooms" },
    { label: "Wellness", href: "#wellness" },
    { label: "Wijn", href: "#wine" },
    { label: "Galerij", href: "#gallery" },
    { label: "Prijzen", href: "#pricing" },
    { label: "Locatie", href: "#location" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200 dark:bg-gray-950/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-2xl bg-gradient-to-tr from-indigo-200 via-sky-200 to-emerald-200 border dark:border-gray-700" />
          <div className="leading-tight">
            <p className="font-semibold text-lg tracking-tight">
              Porta da Lagoa
            </p>
            <p className="text-xs text-gray-500">Sea • Wellness • Wine</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="navlink">
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeLangBar />
      </div>
    </div>
  );
}

function Hero() {
  const gradient = useMemo(
    () =>
      `linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.2), rgba(0,0,0,.1))`,
    []
  );
  return (
    <section id="home" className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SITE.heroImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
        <div className="max-w-2xl text-white">
          <Badge className="mb-4 bg-white/90 text-gray-900 dark:bg-gray-800 dark:text-white">
            B&B aan de kust
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
            Porta da Lagoa
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90">
            {SITE.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#rooms">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button>Ontdek onze kamers</Button>
              </motion.div>
            </a>
            <a href="#contact">
              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="inverted"
                  className="backdrop-blur border-white/60 shadow-lg"
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Direct boeken
                </Button>
              </motion.div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCards() {
  const items = [
    {
      icon: Waves,
      title: "Zeezicht",
      text: "Op wandelafstand van het strand.",
    },
    {
      icon: Bath,
      title: "Wellness",
      text: "Sauna & jacuzzi, handdoeken en badjassen voorzien.",
    },
    { icon: Wine, title: "Rode wijn", text: "Selectie aan lokale topwijnen." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <motion.div
            key={f.title}
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Card className="shadow-sm hover:shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <f.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-5 text-sm text-gray-600 dark:text-gray-300">
                {f.text}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Wellness() {
  return (
    <section id="wellness" className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Wellness
          </h2>
          <p className="mt-3 text-muted-foreground max-w-prose">
            Laat de dag wegsmelten in onze sauna en jacuzzi. Reserveren kan per
            uur zodat je in alle rust kan genieten.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>✔ Privé sauna & jacuzzi</li>
            <li>✔ Handdoeken & badjassen</li>
            <li>✔ Aromatherapie op aanvraag</li>
          </ul>
        </div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1556909114-16f07b21aa98?q=80&w=1400&auto=format&fit=crop)`,
          }}
        />
      </div>
    </section>
  );
}

function Rooms() {
  return (
    <section
      id="rooms"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Kamers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Design, comfort en rust — kies de kamer die bij je past.
          </p>
        </div>
        <a href="#contact">
          <Button variant="outline" className="hidden sm:inline-flex">
            Beschikbaarheid
          </Button>
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Card className="overflow-hidden rounded-2xl">
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url(${room.img})` }}
              />
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  {room.name}
                  <span className="text-base font-normal text-gray-500">
                    € {room.price}/nacht
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {room.desc}
                </p>
                <div className="mt-4 flex justify-end">
                  <a href="#contact">
                    <Button>Boek {room.name}</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = SITE.gallery;
  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
        Galerij
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {imgs.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -2 }}
            className="rounded-xl overflow-hidden"
          >
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function parseISO(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function nightsBetween(a, b) {
  return Math.max(0, Math.round((+b - +a) / (1000 * 60 * 60 * 24)));
}
const SEASONS = [
  { name: "Laagseizoen", start: "11-01", end: "03-31", rate: 129 },
  { name: "Middenseizoen", start: "04-01", end: "06-30", rate: 159 },
  { name: "Hoogseizoen", start: "07-01", end: "10-31", rate: 189 },
];
function seasonFor(date) {
  const y = date.getFullYear();
  const toDate = (mmdd, bump = false) => {
    const [m, d] = mmdd.split("-").map(Number);
    return new Date(bump ? y + 1 : y, m - 1, d);
  };
  for (const s of SEASONS) {
    const sm = Number(s.start.split("-")[0]);
    const em = Number(s.end.split("-")[0]);
    const wrap = sm > em;
    const start = toDate(s.start, false);
    const end = toDate(s.end, wrap);
    if (
      (!wrap && date >= start && date <= end) ||
      (wrap && (date >= start || date <= end))
    )
      return s;
  }
  return SEASONS[0];
}

function Pricing() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const pad = (n) => String(n).padStart(2, "0");
  const minDate = `${yyyy}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;
  const [ci, setCi] = useState(minDate);
  const [co, setCo] = useState(minDate);
  const [est, setEst] = useState({ nights: 0, total: 0, lines: [] });

  useEffect(() => {
    const a = parseISO(ci),
      b = parseISO(co);
    const n = nightsBetween(a, b);
    let total = 0,
      lines = [];
    for (let i = 0; i < n; i++) {
      const d = new Date(a);
      d.setDate(a.getDate() + i);
      const s = seasonFor(d);
      total += s.rate;
      lines.push({
        date: d.toISOString().slice(0, 10),
        season: s.name,
        rate: s.rate,
      });
    }
    setEst({ nights: n, total, lines });
  }, [ci, co]);

  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
        Prijzen
      </h2>
      <Card className="rounded-2xl">
        <CardContent className="pt-5">
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {ci || "Selecteer"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={parseISO(ci)}
                    onSelect={(d) => {
                      if (!d) return;
                      const v = d.toISOString().slice(0, 10);
                      setCi(v);
                      if (co < v) setCo(v);
                    }}
                    disabled={{ before: new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm mb-1">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {co || "Selecteer"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={parseISO(co)}
                    onSelect={(d) => {
                      if (!d) return;
                      const v = d.toISOString().slice(0, 10);
                      setCo(v);
                    }}
                    disabled={{ before: parseISO(ci) || new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-end">
              <div className="text-sm">
                <div className="font-medium">
                  Geschatte totaalprijs: € {est.total}{" "}
                  <span className="text-gray-500">({est.nights} nachten)</span>
                </div>
                <div className="text-gray-500">
                  Seizoenen: laag €129 · midden €159 · hoog €189
                </div>
              </div>
            </div>
          </div>
          {est.lines.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {est.lines.map((b) => (
                <div
                  key={b.date}
                  className="flex justify-between border-b py-1 border-gray-100 dark:border-gray-800"
                >
                  <span>
                    {b.date} — {b.season}
                  </span>
                  <span>€ {b.rate}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function Reviews() {
  const [data, setData] = useState({ source: "mock", items: [] });
  useEffect(() => {
    fetch("/api/facebook-reviews")
      .then((r) => r.json())
      .then((d) => {
        if (!d.items || !d.items.length) {
          setData({
            source: "mock",
            items: [
              {
                id: "x1",
                reviewer: "Gast",
                rating: 5,
                review_text: "Fantastisch!",
                created_time: new Date().toISOString(),
              },
            ],
          });
        } else {
          setData(d);
        }
      })
      .catch(() => {
        setData({
          source: "mock",
          items: [
            {
              id: "x1",
              reviewer: "Gast",
              rating: 5,
              review_text: "Fantastisch!",
              created_time: new Date().toISOString(),
            },
          ],
        });
      });
  }, []);
  const items = data.items || [];
  return (
    <section
      id="reviews"
      className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
          Reviews
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>{r.reviewer}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(r.created_time).toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-gray-600 dark:text-gray-300">
                  <div
                    className="flex items-center gap-1 mb-2"
                    aria-label={`${r.rating} / 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(r.rating || 5)
                            ? "fill-current"
                            : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                  {r.review_text || "—"}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
          <Facebook className="h-4 w-4" /> Bron: {data.source}
        </p>
      </div>
    </section>
  );
}

function Location() {
  const src = useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(
        SITE.address
      )}&output=embed`,
    []
  );
  return (
    <section
      id="location"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Locatie
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-prose">
            {SITE.address}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                SITE.address
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary">
                <MapPin className="mr-2 h-4 w-4" /> Open in Maps
              </Button>
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer">
              <Button variant="outline">
                <Facebook className="mr-2 h-4 w-4" /> Facebook
              </Button>
            </a>
          </div>
        </div>
        <div className="w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden shadow bg-gray-100 dark:bg-gray-800"
          >
            <iframe
              title="Porta da Lagoa map"
              src={src}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
          <p className="text-xs text-gray-500 mt-2">Google Maps embed.</p>
        </div>
      </div>
    </section>
  );
}

function BookingContact() {
  const [errors, setErrors] = useState([]);
  const [tab, setTab] = useState("book");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const vals = Object.fromEntries(new FormData(form).entries());
    const err = [];
    if (!vals.first) err.push("Voornaam is verplicht.");
    if (!vals.last) err.push("Achternaam is verplicht.");
    if (!vals.email || !/.+@.+\..+/.test(vals.email))
      err.push("Geldig e-mail adres is verplicht.");
    if (!vals.phone) err.push("Telefoon is verplicht.");
    if (!vals.checkin) err.push("Check-in is verplicht.");
    if (!vals.checkout) err.push("Check-out is verplicht.");
    const ci = vals.checkin ? new Date(vals.checkin) : null;
    const co = vals.checkout ? new Date(vals.checkout) : null;
    const midnight = (d) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const todayMid = midnight(new Date());
    if (ci && ci < todayMid)
      err.push("Check-in mag niet in het verleden liggen.");
    if (co && co < todayMid)
      err.push("Check-out mag niet in het verleden liggen.");
    if (ci && co && co <= ci) err.push("Check-out moet na check-in liggen.");
    setErrors(err);
    if (err.length) return;
    const subject = encodeURIComponent(
      `Boekingsaanvraag — ${vals.first} ${vals.last}`
    );
    const body = encodeURIComponent(
      `Naam: ${vals.first} ${vals.last}\nE-mail: ${vals.email}\nTelefoon: ${
        vals.phone
      }\nCheck-in: ${vals.checkin}\nCheck-out: ${vals.checkout}\nOpmerkingen: ${
        vals.notes || ""
      }`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Boeken & Contact
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-prose">
              Vragen over beschikbaarheid of speciale wensen? Laat een bericht
              achter — we antwoorden snel.
            </p>
            <Tabs value={tab} onValueChange={setTab} className="mt-6">
              {/* SLIDING PILL TABS */}
              <TabsList className="relative grid grid-cols-2 p-1 rounded-xl bg-muted">
                <TabsTrigger
                  value="book"
                  className="relative rounded-lg px-3 py-1.5 font-medium data-[state=active]:text-primary-foreground"
                >
                  {tab === "book" && (
                    <motion.span
                      layoutId="tabs-pill"
                      className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                      style={{ pointerEvents: "none" }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <span className="relative z-10">Boeken</span>
                </TabsTrigger>

                <TabsTrigger
                  value="contact"
                  className="relative rounded-lg px-3 py-1.5 font-medium data-[state=active]:text-primary-foreground"
                >
                  {tab === "contact" && (
                    <motion.span
                      layoutId="tabs-pill"
                      className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                      style={{ pointerEvents: "none" }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <span className="relative z-10">Contact</span>
                </TabsTrigger>
              </TabsList>

              {/* SLIDING CONTENT */}
              <div className="relative overflow-hidden mt-4 min-h-[340px]">
                <AnimatePresence mode="wait" initial={false}>
                  {tab === "book" ? (
                    <motion.div
                      key="book"
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 40, opacity: 0 }}
                      transition={{
                        duration: 0.28,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      className="absolute inset-0"
                    >
                      {/* --- JOUW FORM ONGEWIJZIGD --- */}
                      <form className="grid gap-3" onSubmit={submit}>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Input name="first" placeholder="Voornaam" required />
                          <Input
                            name="last"
                            placeholder="Achternaam"
                            required
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Input
                            name="checkin"
                            type="date"
                            placeholder="Check-in"
                            min={minDate}
                            required
                          />
                          <Input
                            name="checkout"
                            type="date"
                            placeholder="Check-out"
                            min={minDate}
                            required
                          />
                        </div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="E-mail"
                          required
                        />
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Telefoon"
                          required
                        />
                        <Textarea
                          name="notes"
                          placeholder="Opmerkingen (optioneel)"
                        />
                        {errors.length > 0 && (
                          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900">
                            <ul className="list-disc pl-4">
                              {errors.map((e, i) => (
                                <li key={i}>{e}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          <Button type="submit">
                            <CalendarCheck className="mr-2 h-4 w-4" />
                            Verstuur aanvraag
                          </Button>
                          <a href="#pricing">
                            <Button variant="outline">Prijzen</Button>
                          </a>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="contact"
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -40, opacity: 0 }}
                      transition={{
                        duration: 0.28,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      className="absolute inset-0"
                    >
                      {/* --- JOUW CONTACT INFO ONGEWIJZIGD --- */}
                      <div className="space-y-3 text-sm">
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4" /> {SITE.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" /> {SITE.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> {SITE.address}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Tabs>
          </div>
          <div className="space-y-4">
            <Card className="rounded-2xl hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Waarom kiezen voor Porta da Lagoa?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>✔ Intieme B&B met moderne afwerking</p>
                <p>✔ Wellnessfaciliteiten en wijnselectie</p>
                <p>✔ Zeezicht en strand dichtbij</p>
                <p>✔ Vers en lokaal ontbijt</p>
              </CardContent>
            </Card>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Card className="rounded-2xl overflow-hidden">
                <div
                  className="h-36 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop)`,
                  }}
                />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Speciale arrangementen
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-gray-600 dark:text-gray-300">
                  Verjaardagsverrassing? Romantische getaway? We denken graag
                  mee.
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Porta da Lagoa</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} — Alle rechten voorbehouden.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61575830455388"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline">
                <Facebook className="mr-2 h-4 w-4" /> Facebook
              </Button>
            </a>
            <a href="#contact">
              <Button>
                Boek nu <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <Hero />
      <FeatureCards />
      <Rooms />
      <Wellness />
      <Wine />
      <Gallery />
      <Pricing />
      <Reviews />
      <Location />
      <BookingContact />
      <Footer />
    </div>
  );
}
