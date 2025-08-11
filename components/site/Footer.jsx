"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, ChevronRight } from "lucide-react";

export default function Footer(){
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Porta da Lagoa</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} — Alle rechten voorbehouden.</p>
          </div>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/profile.php?id=61575830455388" target="_blank" rel="noreferrer">
              <Button variant="outline"><Facebook className="mr-2 h-4 w-4" /> Facebook</Button>
            </a>
            <a href="#contact">
              <Button>Boek nu <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
