"use client";

import React from "react";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import FeatureCards from "@/components/site/FeatureCards";
import Rooms from "@/components/site/Rooms";
import Wellness from "@/components/site/Wellness";
import WineSection from "@/components/site/WineSection";
import Gallery from "@/components/site/Gallery";
import Pricing from "@/components/site/Pricing";
import Reviews from "@/components/site/Reviews";
import Location from "@/components/site/Location";
import BookingContact from "@/components/site/BookingContact";
import Footer from "@/components/site/Footer";
import { I18nProvider } from "@/components/site/i18n";

export default function Page() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Header />
        <Hero />
        <FeatureCards />
        <Rooms />
        <Wellness />
        <WineSection />
        <Gallery />
        <Pricing />
        <Reviews />
        <Location />
        <BookingContact />
        <Footer />
      </div>
    </I18nProvider>
  );
}
