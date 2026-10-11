import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = (searchParams.get("city") || "Patna").slice(0, 80);
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Weather is not configured. Add OPENWEATHER_API_KEY to .env.local." }, { status: 503 });
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric&lang=hi`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data.message || "Weather provider request failed." }, { status: res.status });
    return NextResponse.json({
      city: data.name,
      temperatureC: data.main?.temp,
      feelsLikeC: data.main?.feels_like,
      humidity: data.main?.humidity,
      description: data.weather?.[0]?.description,
      windMetersPerSecond: data.wind?.speed,
      observedAt: data.dt ? new Date(data.dt * 1000).toISOString() : null,
      source: "OpenWeather"
    });
  } catch {
    return NextResponse.json({ error: "Could not fetch weather right now." }, { status: 502 });
  }
}
