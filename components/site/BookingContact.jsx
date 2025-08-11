"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarCheck, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "./constants";
import { fmt, startOfToday, toISO } from "./helpers";

export default function BookingContact() {
  const [errors, setErrors] = useState([]);
  const [tab, setTab] = useState("book");
  const [range, setRange] = useState({ from: null, to: null });

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
    if (!range.from || !range.to)
      err.push("Kies een geldige verblijfsperiode.");
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
              {/* Sliding pill */}
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    />
                  )}
                  <span className="relative z-10">Contact</span>
                </TabsTrigger>
              </TabsList>

              {/* Sliding content */}
              <div className="relative overflow-x-hidden overflow-y-visible mt-4 min-h-[520px] sm:min-h-[440px] md:min-h-[380px]">
                <AnimatePresence mode="wait" initial={false}>
                  {tab === "book" ? (
                    <motion.div
                      key="book"
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 40, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <form className="grid gap-3 pb-2" onSubmit={submit}>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Input name="first" placeholder="Voornaam" required />
                          <Input
                            name="last"
                            placeholder="Achternaam"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="block text-sm">Verblijf</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="justify-start font-normal"
                              >
                                {range.from && range.to
                                  ? `${fmt(range.from)} → ${fmt(range.to)}`
                                  : "Selecteer check-in & check-out"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="p-0">
                              <Calendar
                                mode="range"
                                numberOfMonths={2}
                                selected={range}
                                onSelect={(r) =>
                                  setRange(r ?? { from: null, to: null })
                                }
                                disabled={{ before: startOfToday() }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <input
                            type="hidden"
                            name="checkin"
                            value={toISO(range.from)}
                          />
                          <input
                            type="hidden"
                            name="checkout"
                            value={toISO(range.to)}
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
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
