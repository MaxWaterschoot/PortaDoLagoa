"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Wellness(){
  return (
    <section id="wellness" className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Wellness</h2>
          <p className="mt-3 text-muted-foreground max-w-prose">
            Laat de dag wegsmelten in onze sauna en jacuzzi. Reserveren kan per uur zodat je in alle rust kan genieten.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>✔ Privé sauna & jacuzzi</li>
            <li>✔ Handdoeken & badjassen</li>
            <li>✔ Aromatherapie op aanvraag</li>
          </ul>
        </div>
        <motion.div whileHover={{scale:1.03}} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-cover bg-center"
          style={{backgroundImage:`url(https://images.unsplash.com/photo-1556909114-16f07b21aa98?q=80&w=1400&auto=format&fit=crop)`}}/>
      </div>
    </section>
  );
}
