"use client";
import React from "react";
import { ROOMS } from "./constants";
import { useI18n } from "./i18n";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
export default function Rooms() {
  const { t } = useI18n();
  return (
    <section
      id="rooms"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {t("rooms.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t("rooms.subtitle")}
          </p>
        </div>
        <a href="#contact">
          <Button variant="outline" className="hidden sm:inline-flex">
            {t("cta.availability")}
          </Button>
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((room) => {
          // img kan array zijn; toon max. 2
          const images = Array.isArray(room.img)
            ? room.img.slice(0, 2)
            : room.img
            ? [room.img]
            : [];

          return (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Card className="overflow-hidden rounded-2xl">
                {/* MEDIA */}
                <div className="h-44 w-full overflow-hidden">
                  {images.length === 0 && (
                    <div className="h-full w-full bg-muted/50" />
                  )}

                  {images.length === 1 && (
                    <img
                      src={images[0]}
                      alt={room.name}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {images.length === 2 && (
                    <div className="grid grid-cols-2 h-44">
                      {images.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${room.name} - foto ${i + 1}`}
                          className={`h-44 w-full object-cover ${
                            i === 0 ? "border-r border-white/10" : ""
                          }`}
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
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
                      <Button>{t("cta.bookNow")}</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
