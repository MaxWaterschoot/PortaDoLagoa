"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { startOfToday, fmt, seasonFor } from "./helpers";

export default function Pricing(){
  const [range, setRange] = useState({ from: null, to: null });
  const [est, setEst] = useState({ nights: 0, total: 0, lines: [] });

  useEffect(()=>{
    const a = range.from, b = range.to;
    if(!a || !b){ setEst({ nights:0, total:0, lines:[] }); return; }
    const nights = Math.max(0, Math.round((+b - +a)/(1000*60*60*24)));
    let total = 0, lines = [];
    for(let i=0;i<nights;i++){
      const d = new Date(a); d.setDate(a.getDate()+i);
      const s = seasonFor(d); total += s.rate;
      lines.push({ date: d.toISOString().slice(0,10), season: s.name, rate: s.rate });
    }
    setEst({ nights, total, lines });
  }, [range]);

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Prijzen</h2>
      <Card className="rounded-2xl">
        <CardContent className="pt-5">
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <label className="block text-sm mb-1">Periode</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    {range.from && range.to ? `${fmt(range.from)} → ${fmt(range.to)}` : "Selecteer periode"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="range"
                    numberOfMonths={2}
                    selected={range}
                    onSelect={(r)=>setRange(r ?? { from:null, to:null })}
                    disabled={{ before: startOfToday() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="text-sm">
              <div className="font-medium">
                Geschatte totaalprijs: € {est.total}{" "}
                <span className="text-muted-foreground">({est.nights} nachten)</span>
              </div>
              <div className="text-muted-foreground">
                Seizoenen: laag €129 · midden €159 · hoog €189
              </div>
            </div>
          </div>

          {est.lines.length>0 && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {est.lines.map((b)=>(
                <div key={b.date} className="flex justify-between border-b py-1 border-gray-100 dark:border-gray-800">
                  <span>{b.date} — {b.season}</span>
                  <span>€ {b.rate}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
