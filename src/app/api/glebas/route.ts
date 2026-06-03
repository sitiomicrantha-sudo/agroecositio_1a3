import { NextResponse } from "next/server";
import { db } from "@/db";
import { glebas } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");

    if (!propertyId) {
      return NextResponse.json(
        { error: "propertyId é obrigatório" },
        { status: 400 }
      );
    }

    const allGlebas = await db
      .select()
      .from(glebas)
      .where(eq(glebas.propertyId, propertyId));

    return NextResponse.json(allGlebas);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar glebas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, name, area, notes } = body;

    const newGleba = await db
      .insert(glebas)
      .values({ propertyId, name, area, notes })
      .returning();

    return NextResponse.json(newGleba[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar gleba" },
      { status: 500 }
    );
  }
}
