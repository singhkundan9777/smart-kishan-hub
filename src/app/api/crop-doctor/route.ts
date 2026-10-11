import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI service is not configured. Add GEMINI_API_KEY to .env.local." }, { status: 503 });
    }

    const form = await request.formData();
    const imageFile = form.get("image");
    const crop = String(form.get("crop") || "Unknown crop").slice(0, 100);
    const symptoms = String(form.get("symptoms") || "").slice(0, 1500);

    if (!(imageFile instanceof File)) {
      return NextResponse.json({ error: "Please upload a crop image." }, { status: 400 });
    }
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are supported." }, { status: 400 });
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be 5 MB or smaller." }, { status: 400 });
    }

    const bytes = Buffer.from(await imageFile.arrayBuffer());
    const base64 = bytes.toString("base64");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an agricultural information assistant for Indian farmers. Analyze this crop photo only as preliminary guidance.
Crop named by user: ${crop}
Farmer observations: ${symptoms || "Not provided"}
Reply in simple Hindi with these headings: (1) फोटो से क्या दिख रहा है, (2) संभावित कारण (state uncertainty; do not claim certainty), (3) what additional observations/photos are needed, (4) low-risk immediate steps, (5) prevention, (6) when to contact a local Krishi Vigyan Kendra/agriculture officer.
Do not invent pesticide doses or prescribe chemicals. If pesticide/fertilizer is being considered, tell user to follow the product label and confirm with local agricultural experts. Mention that photo-based AI cannot provide a definitive diagnosis.`;
    const result = await model.generateContent([
      { inlineData: { data: base64, mimeType: imageFile.type } },
      { text: prompt }
    ]);
    return NextResponse.json({ advice: result.response.text() });
  } catch (error) {
    console.error("Crop doctor error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Crop analysis could not be completed. Check your API configuration and try again." }, { status: 500 });
  }
}
