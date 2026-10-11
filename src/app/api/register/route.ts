import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().regex(/^[6-9][0-9]{9}$/),
  state: z.string().trim().min(2).max(80),
  district: z.string().trim().min(2).max(80),
  farmSize: z.string().trim().max(40).optional().default("")
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const db = await getDb();
    await db.collection("farmer_registrations").insertOne({
      ...body,
      createdAt: new Date(),
      source: "website"
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please check the form details." }, { status: 400 });
    }
    console.error("Registration error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Registration service is not configured or is temporarily unavailable. Please try later." }, { status: 503 });
  }
}
