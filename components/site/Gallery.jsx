"use client";
import React from "react";
import { SITE } from "./constants";
import { motion } from "framer-motion";

export default function Gallery(){
  const imgs = SITE.gallery;
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Galerij</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {imgs.map((src,i)=>(
          <motion.div key={i} whileHover={{scale:1.05, y:-2}} className="rounded-xl overflow-hidden">
            <div className="aspect-[4/3] bg-cover bg-center" style={{backgroundImage:`url(${src})`}}/>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
