import { NextResponse } from "next/server";
import { db } from "@/db";
import { zonas } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const zona = await db
      .select()
      .from(zonas)
      .where(eq(zonas.id, id))
      .limit(1);

    if (zona.length === 0) {
      return NextResponse.json(
        { error: "Zona não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(zona[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar zona" },
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
    const { name, label, description, color, icon, order, status } = body;

    const updated = await db
      .update(zonas)
      .set({ name, label, description, color, icon, order, status, updatedAt: new Date() })
      .where(eq(zonas.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Zona não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar zona" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const archived = await db
      .update(zonas)
      .set({ status: "archived", updatedAt: new Date() })
      .where(eq(zonas.id, id))
      .returning();

    if (archived.length === 0) {
      return NextResponse.json(
        { error: "Zona não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Zona arquivada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao arquivar zona" },
      { status: 500 }
    );
  }
}
