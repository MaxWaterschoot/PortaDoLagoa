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
import { motion } from "framer-motion";
import { SITE } from "./constants";
import { fmt, startOfToday, toISO } from "./helpers";
import { useI18n } from "./i18n";
import { useRecaptchaV3 } from "./useRecaptchaV3";

export default function BookingContact() {
  const { t } = useI18n();
  const { getToken } = useRecaptchaV3();

  const [tab, setTab] = useState("book");
  const [range, setRange] = useState({ from: null, to: null });
  const [errors, setErrors] = useState([]);
  const [captchaError, setCaptchaError] = useState("");

  async function submit(e) {
    e.preventDefault(); // eerst: standaard submit blokkeren

    // 1) reCAPTCHA v3 token
    let token;
    try {
      token = await getToken("booking_submit");
    } catch {
      setCaptchaError(
        "reCAPTCHA kon niet geladen worden. Controleer adblockers en probeer opnieuw."
      );
      return;
    }

    // 2) server-side verificatie
    try {
      const resp = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "booking_submit" }),
      });
      const json = await resp.json();
      if (!json.success) {
        setCaptchaError(
          "Verificatie mislukt (mogelijke spam). Probeer opnieuw."
        );
        return;
      }
    } catch {
      setCaptchaError("Verificatieserver onbereikbaar. Probeer later opnieuw.");
      return;
    }

    // 3) formulier-validatie
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

    // 4) versturen (mailto)
    const subject = encodeURIComponent(
      `Boekingsaanvraag — ${vals.first} ${vals.last}`
    );
    const body = encodeURIComponent(
      `Naam: ${vals.first} ${vals.last}
E-mail: ${vals.email}
Telefoon: ${vals.phone}
Check-in: ${vals.checkin}
Check-out: ${vals.checkout}
Opmerkingen: ${vals.notes || ""}`
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
              {t("contact.title")}
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-prose">
              {t("contact.subtitle")}
            </p>

            <Tabs value={tab} onValueChange={setTab} className="mt-6">
              {/* Slider tabs – pill + transparante triggers */}
              <TabsList className="relative flex p-1 rounded-xl bg-muted overflow-hidden ring-1 ring-border">
                {/* animated pill – iets lichter tint */}
                <motion.span
                  className="absolute inset-y-1 left-1 w-[calc(50%-0.5rem)] rounded-lg bg-primary/85 shadow-sm z-0"
                  animate={{ x: tab === "book" ? "0%" : "100%" }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ pointerEvents: "none" }}
                />

                <TabsTrigger
                  value="book"
                  className="relative flex-1 rounded-lg px-3 py-1.5 font-medium bg-transparent data-[state=active]:bg-transparent z-10
               text-foreground data-[state=active]:text-primary-foreground"
                >
                  <span className="relative z-10">
                    {t("contact.tabs.book")}
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="contact"
                  className="relative flex-1 rounded-lg px-3 py-1.5 font-medium bg-transparent data-[state=active]:bg-transparent z-10
               text-foreground data-[state=active]:text-primary-foreground"
                >
                  <span className="relative z-10">
                    {t("contact.tabs.contact")}
                  </span>
                </TabsTrigger>
              </TabsList>

              {/* Sliding content */}
              <div className="mt-4 relative overflow-hidden">
                <motion.div
                  className="flex w-[200%]"
                  animate={{ x: tab === "book" ? "0%" : "-50%" }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {/* Boeken-paneel */}
                  <div className="w-1/2 pr-0 sm:pr-6">
                    <form className="grid gap-3 pb-2" onSubmit={submit}>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Input
                          name="first"
                          placeholder={t("form.first")}
                          required
                        />
                        <Input
                          name="last"
                          placeholder={t("form.last")}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="block text-sm">
                          {t("form.stay")}
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start font-normal"
                            >
                              {range.from && range.to
                                ? `${fmt(range.from)} → ${fmt(range.to)}`
                                : t("form.selectRange")}
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
                        placeholder={t("form.email")}
                        required
                      />
                      <Input
                        name="phone"
                        type="tel"
                        placeholder={t("form.phone")}
                        required
                      />
                      <Textarea name="notes" placeholder={t("form.notes")} />

                      {/* veldfouten */}
                      {errors.length > 0 && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900">
                          <ul className="list-disc pl-4">
                            {errors.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* captcha-fout (boven knoppen) */}
                      {captchaError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900">
                          {captchaError}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <Button type="submit">
                          <CalendarCheck className="mr-2 h-4 w-4" />
                          {t("form.send")}
                        </Button>
                        <a href="#pricing">
                          <Button variant="outline">{t("cta.pricing")}</Button>
                        </a>
                      </div>
                    </form>
                  </div>

                  {/* Contact-paneel */}
                  <div className="w-1/2 pl-0 sm:pl-6">
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
                  </div>
                </motion.div>
              </div>
            </Tabs>
          </div>

          {/* rechterkolom */}
          <div className="space-y-4">
            <Card className="rounded-2xl hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{t("why.title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>{t("why.l1")}</p>
                <p>{t("why.l2")}</p>
                <p>{t("why.l3")}</p>
                <p>{t("why.l4")}</p>
                <p>{t("why.l5")}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl overflow-hidden">
              <div
                className="h-36 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop)",
                }}
              />
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {t("arrangements.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-600 dark:text-gray-300">
                {t("arrangements.body")}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
