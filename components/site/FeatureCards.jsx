"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Waves, Bath, Wine } from "lucide-react";
import { motion } from "framer-motion";
export default function FeatureCards() {
  const items = [
    {
      icon: Waves,
      title: "Zeezicht",
      text: "Op wandelafstand van het strand.",
    },
    {
      icon: Bath,
      title: "Wellness & relax",
      text: "Sauna, handdoeken en badjassen voorzien.",
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
