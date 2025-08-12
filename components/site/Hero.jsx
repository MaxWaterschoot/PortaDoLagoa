"use client";
import React,{useMemo} from "react";
import { SITE } from "./constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "./i18n";
export default function Hero(){const { t } = useI18n();const gradient=useMemo(()=>`linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.2), rgba(0,0,0,.1))`,[]);return(<section id="home" className="relative"><div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${SITE.heroImage})`}} aria-hidden/><div className="absolute inset-0" style={{background:gradient}}/><div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36"><div className="max-w-2xl text-white"><Badge className="mb-4 bg-white/90 text-gray-900 dark:bg-gray-800 dark:text-white">{t("badge.bb")}</Badge><h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">{SITE.name}</h1><p className="mt-4 text-lg sm:text-xl text-white/90">{t("hero.tagline")}</p><div className="mt-8 flex flex-wrap gap-3"><a href="#rooms"><motion.div whileHover={{scale:1.03}} whileTap={{scale:0.98}}><Button>{t("cta.rooms")}</Button></motion.div></a><a href="#contact"><motion.div whileHover={{scale:1.05,y:-1}} whileTap={{scale:0.98}}><Button variant="inverted" className="backdrop-blur border-white/60 shadow-lg"><CalendarCheck className="mr-2 h-4 w-4"/>{t("cta.book")}</Button></motion.div></a></div></div></div></section>);}