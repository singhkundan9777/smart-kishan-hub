import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Kisan Hub | स्मार्ट खेती, समृद्ध किसान",
  description: "Farmer-first agriculture platform for crop guidance, weather awareness and farming knowledge.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hi"><body>{children}</body></html>;
}
