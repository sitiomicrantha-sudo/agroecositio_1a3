import { NextResponse } from "next/server";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allProperties = await db.select().from(properties);
    return NextResponse.json(allProperties);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar propriedades" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, location, totalArea, owner } = body;

    const newProperty = await db
      .insert(properties)
      .values({ name, location, totalArea, owner })
      .returning();

    return NextResponse.json(newProperty[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar propriedade" },
      { status: 500 }
    );
  }
}
