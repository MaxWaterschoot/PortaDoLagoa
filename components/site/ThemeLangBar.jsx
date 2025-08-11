"use client";
import React, { useEffect } from "react";
import { Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersisted } from "./helpers";

export default function ThemeLangBar(){
  const [theme, setTheme] = usePersisted("theme", "light");
  const [lang, setLang] = usePersisted("lang", "nl");
  useEffect(()=>{
    if(theme==="dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">
        {theme==="dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      <div className="inline-flex items-center gap-1">
        <Globe className="h-4 w-4" />
        <select value={lang} onChange={(e)=>setLang(e.target.value)} className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:bg-gray-900 dark:border-gray-700">
          <option value="nl">NL</option>
          <option value="en">EN</option>
          <option value="pt">PT</option>
        </select>
      </div>
    </div>
  );
}
