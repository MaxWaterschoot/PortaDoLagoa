"use client";
import React from "react";
import ThemeLangBar from "./ThemeLangBar";
import { SITE } from "./constants";

export default function Header(){
  const links = [
    { label: "Home", href: "#home" },
    { label: "Kamers", href: "#rooms" },
    { label: "Wellness", href: "#wellness" },
    { label: "Wijn", href: "#wine" },
    { label: "Galerij", href: "#gallery" },
    { label: "Prijzen", href: "#pricing" },
    { label: "Locatie", href: "#location" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200 dark:bg-gray-950/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-2xl bg-gradient-to-tr from-indigo-200 via-sky-200 to-emerald-200 border dark:border-gray-700" />
          <div className="leading-tight">
            <p className="font-semibold text-lg tracking-tight">{SITE.name}</p>
            <p className="text-xs text-gray-500">Sea • Wellness • Wine</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map((l)=>(<a key={l.href} href={l.href} className="navlink">{l.label}</a>))}
        </nav>
        <ThemeLangBar />
      </div>
    </div>
  );
}
