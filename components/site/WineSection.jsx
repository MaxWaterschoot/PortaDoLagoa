"use client";
import React from "react";
import { motion } from "framer-motion";

export default function WineSection(){
  return (
    <section id="wine" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div whileHover={{scale:1.03}} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-cover bg-center"
          style={{backgroundImage:`url(https://images.unsplash.com/photo-1514361892635-6b07e31e75b7?q=80&w=1400&auto=format&fit=crop)`}}/>
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Wijnmomenten</h2>
          <p className="mt-3 text-muted-foreground max-w-prose">
            Liefde voor goede rode wijn zit in ons DNA. Proef lokale klassiekers en verrassende ontdekkingen — perfect bij zonsondergang.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>✔ Lokale selectie</li>
            <li>✔ Huislabel</li>
            <li>✔ Pairing tips</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
