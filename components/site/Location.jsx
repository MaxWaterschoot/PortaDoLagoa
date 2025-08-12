"use client";
import React, { useMemo } from "react";
import { SITE } from "./constants";
import { Button } from "@/components/ui/button";
import { MapPin, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "./i18n";
export default function Location() {
  const { t } = useI18n();
  const src = useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(
        SITE.address
      )}&t=h&z=17&output=embed`, // t=k voor pure satellite, t=h voor satellite + labels
    [SITE.address]
  );
  return (
    <section
      id="location"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {t("location.title")}
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
                <MapPin className="mr-2 h-4 w-4" /> {t("location.openMaps")}
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
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow bg-gray-100 dark:bg-gray-800">
            <iframe
              title="Porta da Lagoa map"
              src={src}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="text-xs text-gray-500 mt-2">Google Maps embed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
