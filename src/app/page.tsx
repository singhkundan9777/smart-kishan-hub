"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { crops } from "@/lib/crops";

const features = [
  { icon: "🌿", title: "AI Crop Doctor", text: "फसल के लक्षण समझने के लिए AI-आधारित शुरुआती मार्गदर्शन।" },
  { icon: "🌦️", title: "मौसम की जानकारी", text: "मौसम API जोड़कर अपने क्षेत्र की forecast और alerts देखें।" },
  { icon: "📈", title: "मंडी भाव", text: "विश्वसनीय स्रोत से जुड़े बाजार भाव और तारीख के साथ जानकारी।" },
  { icon: "🌾", title: "फसल गाइड", text: "फसल, मौसम, मिट्टी और खेती की बुनियादी जानकारी एक जगह।" },
  { icon: "🧑‍🌾", title: "किसान सहायता", text: "किसान registration और आगे dashboard बनाने के लिए आधार।" },
  { icon: "📚", title: "सीखें और बढ़ें", text: "खेती की उपयोगी जानकारी, सावधानियां और सीखने के संसाधन।" }
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("सभी");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const filtered = useMemo(() => crops.filter(c => {
    const matchesQuery = (c.name + c.category + c.season + c.soil).toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "सभी" || c.category === category);
  }), [query, category]);

  return (
    <main>
      <header className="sticky top-0 z-30 border-b border-leaf-100 bg-white/90 backdrop-blur">
        <div className="container flex min-h-[74px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf-600 text-xl text-white">🌱</span>
            <span><strong className="block text-lg leading-tight text-leaf-900">Smart Kisan Hub</strong><small className="text-xs text-leaf-700">स्मार्ट खेती, समृद्ध किसान</small></span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            <a href="#features" className="text-leaf-900 no-underline hover:text-leaf-600">फीचर्स</a>
            <a href="#crops" className="text-leaf-900 no-underline hover:text-leaf-600">फसल गाइड</a>
            <a href="#register" className="text-leaf-900 no-underline hover:text-leaf-600">किसान रजिस्ट्रेशन</a>
            <a href="#about" className="text-leaf-900 no-underline hover:text-leaf-600">हमारे बारे में</a>
          </nav>
          <div className="flex items-center gap-2">
            <a className="btn-primary hidden text-sm no-underline sm:inline-flex" href="#register">शुरू करें <span aria-hidden>→</span></a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-xl border border-leaf-100 bg-white text-xl text-leaf-900 lg:hidden"
              aria-label={mobileMenuOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >{mobileMenuOpen ? "✕" : "☰"}</button>
          </div>
        </div>
        {mobileMenuOpen && <nav className="border-t border-leaf-100 bg-white px-5 py-3 shadow-sm lg:hidden">
          <div className="container flex flex-col gap-1">
            {[
              ["फीचर्स", "#features"],
              ["फसल गाइड", "#crops"],
              ["किसान रजिस्ट्रेशन", "#register"],
              ["हमारे बारे में", "#about"]
            ].map(([label, href]) => <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-leaf-900 no-underline hover:bg-leaf-50">{label} →</a>)}
          </div>
        </nav>}
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#eff8ef] via-[#f8fbf5] to-[#fff7e3]">
        <div className="container grid items-center gap-8 py-10 sm:gap-12 sm:py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <span className="eyebrow">🌾 किसान के लिए डिजिटल साथी</span>
            <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight text-leaf-900 min-[390px]:text-4xl sm:mt-6 sm:text-5xl md:text-6xl">
              खेती के हर कदम पर <span className="text-leaf-600">सही जानकारी</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#526c57]">
              फसल की जानकारी, खेती के उपयोगी सुझाव और तकनीक को एक जगह लाने की पहल — किसानों के लिए सरल, उपयोगी और भरोसेमंद अनुभव।
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#crops" className="btn-primary no-underline">फसल गाइड देखें ↗</a>
              <a href="#features" className="btn-secondary no-underline">फीचर्स जानें</a>
            </div>
            <p className="mt-5 text-xs text-[#687b69]">जय जवान, जय किसान 🇮🇳</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-leaf-100/70 blur-2xl" />
            <div className="card relative overflow-hidden p-3 sm:p-7">
              <div className="rounded-[20px] bg-gradient-to-br from-leaf-700 to-leaf-900 p-4 text-white sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-sm text-leaf-100">आपका खेती साथी</p><h2 className="mt-2 text-2xl font-bold">Smart Kisan Hub</h2></div>
                  <span className="text-4xl">🌱</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 sm:p-4"><span className="text-2xl">🌤️</span><p className="mt-2 text-sm font-semibold">मौसम अपडेट</p><p className="mt-1 text-xs text-leaf-100">API जोड़ने पर उपलब्ध</p></div>
                  <div className="rounded-2xl bg-white/10 p-3 sm:p-4"><span className="text-2xl">🍃</span><p className="mt-2 text-sm font-semibold">फसल सहायता</p><p className="mt-1 text-xs text-leaf-100">AI मार्गदर्शन</p></div>
                  <div className="rounded-2xl bg-white/10 p-3 sm:p-4"><span className="text-2xl">📊</span><p className="mt-2 text-sm font-semibold">मंडी भाव</p><p className="mt-1 text-xs text-leaf-100">स्रोत integration जरूरी</p></div>
                  <div className="rounded-2xl bg-white/10 p-3 sm:p-4"><span className="text-2xl">📖</span><p className="mt-2 text-sm font-semibold">फसल गाइड</p><p className="mt-1 text-xs text-leaf-100">शुरुआती सूची शामिल</p></div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-leaf-50 p-4">
                <span className="text-2xl">🤝</span><p className="text-sm leading-6 text-leaf-900"><strong>जानकारी से बेहतर फैसले।</strong><br/><span className="muted">हर सलाह को स्थानीय विशेषज्ञ से सत्यापित करें।</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-14 sm:py-20 md:py-[76px]">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center"><span className="eyebrow">हम क्या बना रहे हैं</span><h2 className="mt-4 text-3xl font-black text-leaf-900 sm:text-4xl">खेती के लिए उपयोगी टूल्स</h2><p className="mt-4 leading-7 muted">मुख्य सुविधाओं का आधार तैयार है। मौसम, AI और मंडी के लाइव डेटा के लिए संबंधित सेवाओं की API keys/configuration जरूरी है।</p></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => <article key={f.title} className="card p-6 transition hover:-translate-y-1 hover:shadow-soft"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-50 text-2xl">{f.icon}</div><h3 className="mt-5 text-xl font-bold text-leaf-900">{f.title}</h3><p className="mt-2 leading-7 muted">{f.text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="crops" className="bg-white py-14 sm:py-20 md:py-[76px]">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><span className="eyebrow">फसल जानकारी</span><h2 className="mt-4 text-3xl font-black text-leaf-900 sm:text-4xl">अपनी फसल खोजें</h2><p className="mt-3 muted">यह शुरुआती उदाहरण सूची है, संपूर्ण भारतीय फसल डेटाबेस नहीं।</p></div>
            <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_180px]">
              <input className="field" value={query} onChange={e => setQuery(e.target.value)} placeholder="फसल, मौसम या मिट्टी खोजें..." aria-label="फसल खोजें" />
              <select className="field" value={category} onChange={e => setCategory(e.target.value)} aria-label="फसल श्रेणी">
                {["सभी","अनाज","दलहन","तिलहन","सब्जी","फल","व्यावसायिक"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(c => <article key={c.name} className="rounded-2xl border border-leaf-100 bg-[#fbfdf9] p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold text-leaf-900">{c.name}</h3><span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700">{c.category}</span></div><p className="mt-4 text-sm"><strong>सीजन:</strong> {c.season}</p><p className="mt-2 text-sm"><strong>मिट्टी:</strong> {c.soil}</p><p className="mt-3 text-sm leading-6 muted">{c.note}</p></article>)}
            {filtered.length === 0 && <p className="col-span-full rounded-2xl bg-leaf-50 p-6 text-center muted">कोई परिणाम नहीं मिला। दूसरी फसल या श्रेणी खोजें।</p>}
          </div>
        </div>
      </section>

      <section id="register" className="py-14 sm:py-20 md:py-[76px]">
        <div className="container grid gap-8 md:grid-cols-2">
          <div><span className="eyebrow">आगे की तैयारी</span><h2 className="mt-4 text-3xl font-black text-leaf-900 sm:text-4xl">किसानों की जरूरतों से बनाएं बेहतर प्लेटफॉर्म</h2><p className="mt-4 max-w-xl leading-7 muted">नीचे दिए गए registration form को backend API से जोड़ा गया है। MongoDB configure होने पर submissions database में save होंगे।</p><div className="mt-6 space-y-3 text-sm text-leaf-900"><p>✓ सरल और मोबाइल-फ्रेंडली अनुभव</p><p>✓ जानकारी को सुरक्षित तरीके से संभालने का आधार</p><p>✓ भविष्य में जिले और स्थानीय फसल के अनुसार सुविधाएं</p></div></div>
          <RegistrationForm />
        </div>
      </section>

      <section id="about" className="border-y border-leaf-100 bg-white py-12">
        <div className="container grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2"><h2 className="text-xl font-black text-leaf-900">Smart Kisan Hub</h2><p className="mt-2 max-w-2xl text-sm leading-6 muted">हमारा उद्देश्य किसानों तक उपयोगी कृषि जानकारी को सरल भाषा में पहुंचाने में मदद करना है। AI से मिली जानकारी शुरुआती मार्गदर्शन है, अंतिम कृषि निदान नहीं।</p></div>
          <div className="text-sm md:text-right"><p className="font-bold text-leaf-900">स्मार्ट खेती, समृद्ध किसान</p><p className="mt-2 muted">© {new Date().getFullYear()} Smart Kisan Hub</p></div>
        </div>
      </section>
    </main>
  );
}

function RegistrationForm() {
  const [form, setForm] = useState({ name: "", phone: "", state: "Bihar", district: "", farmSize: "" });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setStatus("");
    try {
      const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setStatus("Registration save ho gaya. Dhanyavaad!");
      setForm({ name: "", phone: "", state: "Bihar", district: "", farmSize: "" });
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Something went wrong.");
    } finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="card p-6 sm:p-7">
    <h3 className="text-xl font-black text-leaf-900">किसान रजिस्ट्रेशन</h3>
    <p className="mt-2 text-sm muted">केवल जरूरी जानकारी भरें। फोन नंबर को सार्वजनिक न करें।</p>
    <div className="mt-5 space-y-4">
      <label className="block text-sm font-semibold">पूरा नाम<input className="field mt-2" required minLength={2} maxLength={80} value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="आपका नाम" /></label>
      <label className="block text-sm font-semibold">मोबाइल नंबर<input className="field mt-2" required inputMode="numeric" pattern="[6-9][0-9]{9}" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="10 अंकों का मोबाइल नंबर" /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">राज्य<select className="field mt-2" value={form.state} onChange={e => setForm({...form,state:e.target.value})}>{["Bihar","Uttar Pradesh","Jharkhand","West Bengal","Madhya Pradesh","Other"].map(s => <option key={s}>{s}</option>)}</select></label>
        <label className="block text-sm font-semibold">जिला<input className="field mt-2" required maxLength={80} value={form.district} onChange={e => setForm({...form,district:e.target.value})} placeholder="जिले का नाम" /></label>
      </div>
      <label className="block text-sm font-semibold">खेती का क्षेत्र (वैकल्पिक)<input className="field mt-2" maxLength={40} value={form.farmSize} onChange={e => setForm({...form,farmSize:e.target.value})} placeholder="जैसे 2 एकड़" /></label>
      <button className="btn-primary w-full" disabled={busy}>{busy ? "Submit हो रहा है..." : "रजिस्टर करें →"}</button>
      {status && <p role="status" className="rounded-xl bg-leaf-50 p-3 text-sm text-leaf-900">{status}</p>}
      <p className="text-xs leading-5 muted">इस demo में वास्तविक registration के लिए MongoDB setup जरूरी है। आगे बढ़ने से पहले privacy notice और data retention policy जोड़ें।</p>
    </div>
  </form>;
}
