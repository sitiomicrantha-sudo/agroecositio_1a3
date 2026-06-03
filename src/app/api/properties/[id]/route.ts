import { NextResponse } from "next/server";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await db
      .select()
      .from(properties)
      .where(eq(properties.id, id))
      .limit(1);

    if (property.length === 0) {
      return NextResponse.json(
        { error: "Propriedade não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(property[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar propriedade" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, location, totalArea, owner } = body;

    const updated = await db
      .update(properties)
      .set({ name, location, totalArea, owner, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Propriedade não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar propriedade" },
      { status: 500 }
    );
  }
}
