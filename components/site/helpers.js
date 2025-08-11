// Date helpers
export const startOfToday = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};
export const fmt = (d) =>
  d?.toLocaleDateString?.("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" }) ?? "";
export const toISO = (d) =>
  d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10) : "";

export function parseISO(s){
  const [y,m,d]=s.split("-").map(Number);
  return new Date(y, m-1, d);
}
export function nightsBetween(a,b){
  return Math.max(0, Math.round((+b - +a) / (1000*60*60*24)));
}

// Seasons
export const SEASONS = [
  { name: "Laagseizoen", start: "11-01", end: "03-31", rate: 129 },
  { name: "Middenseizoen", start: "04-01", end: "06-30", rate: 159 },
  { name: "Hoogseizoen", start: "07-01", end: "10-31", rate: 189 },
];
export function seasonFor(date){
  const y = date.getFullYear();
  const toDate = (mmdd, bump=false)=>{
    const [m,d] = mmdd.split("-").map(Number);
    return new Date(bump ? y+1 : y, m-1, d);
  };
  for(const s of SEASONS){
    const sm = Number(s.start.split("-")[0]);
    const em = Number(s.end.split("-")[0]);
    const wrap = sm > em;
    const start = toDate(s.start, false);
    const end = toDate(s.end, wrap);
    if((!wrap && date>=start && date<=end) || (wrap && (date>=start || date<=end))) return s;
  }
  return SEASONS[0];
}

// Local storage helper hook
import { useEffect, useState } from "react";
export function usePersisted(key, initial){
  const [s, setS] = useState(initial);
  useEffect(()=>{
    const raw = typeof window!=="undefined" ? localStorage.getItem(key) : null;
    if(raw) setS(JSON.parse(raw));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(()=>{
    if (typeof window!=="undefined") localStorage.setItem(key, JSON.stringify(s));
  }, [key, s]);
  return [s, setS];
}
