"use client";

import Link from "next/link";
import { useState } from "react";

export default function CropDoctorPage() {
  const [image, setImage] = useState<File | null>(null);
  const [crop, setCrop] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function analyze(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setAdvice(""); setError("");
    if (!image) { setError("Pehle crop ki photo select karein."); setBusy(false); return; }
    const data = new FormData(); data.append("image", image); data.append("crop", crop); data.append("symptoms", symptoms);
    try {
      const res = await fetch("/api/crop-doctor", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Analysis failed");
      setAdvice(json.advice);
    } catch (err) { setError(err instanceof Error ? err.message : "Kuch galat hua."); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen py-10 sm:py-16">
    <div className="container max-w-3xl">
      <Link href="/" className="text-sm font-bold text-leaf-700 no-underline">← Smart Kisan Hub home</Link>
      <span className="eyebrow mt-6">🌿 AI-assisted crop guidance</span>
      <h1 className="mt-4 text-3xl font-black text-leaf-900 sm:text-4xl">AI Crop Doctor</h1>
      <p className="mt-3 leading-7 muted">फसल की स्पष्ट फोटो और लक्षण दें। यह शुरुआती AI guidance है, अंतिम निदान नहीं।</p>
      <form onSubmit={analyze} className="card mt-8 space-y-5 p-5 sm:p-8">
        <label className="block text-sm font-semibold">फसल का नाम (यदि पता हो)<input className="field mt-2" value={crop} onChange={e=>setCrop(e.target.value)} placeholder="जैसे धान, टमाटर, गेहूँ" maxLength={100}/></label>
        <label className="block text-sm font-semibold">फसल की फोटो<input className="field mt-2" type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)} required/><span className="mt-1 block text-xs font-normal muted">अधिकतम 5 MB. फोटो में पत्ते और प्रभावित हिस्से साफ दिखें।</span></label>
        <label className="block text-sm font-semibold">लक्षण और कब से दिख रहे हैं?<textarea className="field mt-2 min-h-28" value={symptoms} onChange={e=>setSymptoms(e.target.value)} placeholder="जैसे पत्तों पर पीले धब्बे, कितने दिनों से, खेत में कितने पौधे प्रभावित हैं..." maxLength={1500}/></label>
        <button className="btn-primary w-full" disabled={busy}>{busy ? "फोटो का विश्लेषण हो रहा है..." : "फसल के बारे में पूछें →"}</button>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      </form>
      {advice && <section className="card mt-6 p-5 sm:p-8"><h2 className="text-xl font-black text-leaf-900">AI guidance</h2><div className="mt-4 whitespace-pre-wrap leading-7 text-[#294d32]">{advice}</div></section>}
      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">सुरक्षा: केवल AI उत्तर के आधार पर कीटनाशक न मिलाएं या छिड़कें। सही उत्पाद, मात्रा, फसल-लेबल और स्थानीय कृषि विशेषज्ञ की सलाह की पुष्टि करें।</p>
    </div>
  </main>;
}
