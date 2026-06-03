import { NextResponse } from "next/server";
import { db } from "@/db";
import { unidadesMenores } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const unidade = await db
      .select()
      .from(unidadesMenores)
      .where(eq(unidadesMenores.id, id))
      .limit(1);

    if (unidade.length === 0) {
      return NextResponse.json(
        { error: "Unidade menor não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(unidade[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar unidade menor" },
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
    const { name, type } = body;

    const updated = await db
      .update(unidadesMenores)
      .set({ name, type, updatedAt: new Date() })
      .where(eq(unidadesMenores.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Unidade menor não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar unidade menor" },
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

    // Archive the unidade menor
    const archived = await db
      .update(unidadesMenores)
      .set({ status: "archived", updatedAt: new Date() })
      .where(eq(unidadesMenores.id, id))
      .returning();

    if (archived.length === 0) {
      return NextResponse.json(
        { error: "Unidade menor não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Unidade menor arquivada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao arquivar unidade menor" },
      { status: 500 }
    );
  }
}
