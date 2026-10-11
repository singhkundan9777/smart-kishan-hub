"use client";

import Link from "next/link";
import { useState } from "react";

type Weather = { city: string; temperatureC: number; feelsLikeC: number; humidity: number; description: string; windMetersPerSecond: number; observedAt: string; source: string };

export default function WeatherPage() {
  const [city, setCity] = useState("Patna");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError(""); setWeather(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Weather unavailable");
      setWeather(data);
    } catch (err) { setError(err instanceof Error ? err.message : "Weather unavailable"); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen py-10 sm:py-16"><div className="container max-w-2xl">
    <Link href="/" className="text-sm font-bold text-leaf-700 no-underline">← Smart Kisan Hub home</Link>
    <h1 className="mt-8 text-3xl font-black text-leaf-900 sm:text-4xl">मौसम जानकारी</h1>
    <p className="mt-3 leading-7 muted">शहर का नाम दर्ज करें। Live results के लिए OpenWeather API key जरूरी है।</p>
    <form onSubmit={search} className="card mt-7 flex flex-col gap-3 p-5 sm:flex-row"><input className="field" value={city} onChange={e=>setCity(e.target.value)} required maxLength={80} placeholder="जैसे Patna"/><button className="btn-primary shrink-0" disabled={busy}>{busy ? "लोड हो रहा है..." : "मौसम देखें"}</button></form>
    {error && <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{error}</p>}
    {weather && <section className="card mt-5 p-6"><p className="font-bold text-leaf-700">{weather.city} · {weather.description}</p><p className="mt-3 text-5xl font-black text-leaf-900">{Math.round(weather.temperatureC)}°C</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-leaf-50 p-4"><p className="text-sm muted">Feels like</p><strong>{Math.round(weather.feelsLikeC)}°C</strong></div><div className="rounded-xl bg-leaf-50 p-4"><p className="text-sm muted">Humidity</p><strong>{weather.humidity}%</strong></div><div className="rounded-xl bg-leaf-50 p-4"><p className="text-sm muted">Wind</p><strong>{weather.windMetersPerSecond} m/s</strong></div><div className="rounded-xl bg-leaf-50 p-4"><p className="text-sm muted">Source</p><strong>{weather.source}</strong></div></div><p className="mt-4 text-xs muted">Observed: {new Date(weather.observedAt).toLocaleString()}</p></section>}
    <p className="mt-5 text-sm leading-6 muted">कृषि कार्य या कीटनाशक छिड़काव से पहले forecast, हवा और बारिश की संभावना की पुष्टि करें। यह पेज अभी current weather endpoint इस्तेमाल करता है, 5-day forecast नहीं।</p>
  </div></main>;
}
