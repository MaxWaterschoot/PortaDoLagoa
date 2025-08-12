"use client";
import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "./i18n";
export default function Wellness(){ const { t } = useI18n();
  return (<section id="wellness" className="bg-muted/30 py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center"><div><h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t("wellness.title")}</h2><p className="mt-3 text-muted-foreground max-w-prose">{t("wellness.p1")}</p><ul className="mt-6 space-y-2 text-sm"><li>{t("wellness.l1")}</li><li>{t("wellness.l2")}</li><li>{t("wellness.l3")}</li></ul></div><motion.div whileHover={{scale:1.03}} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-cover bg-center" style={{backgroundImage:`url(https://images.unsplash.com/photo-1556909114-16f07b21aa98?q=80&w=1400&auto=format&fit=crop)`}}/></div></section>);}