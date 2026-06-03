import { NextResponse } from "next/server";
import { db } from "@/db";
import { glebas, talhoes, unidadesMenores } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gleba = await db
      .select()
      .from(glebas)
      .where(eq(glebas.id, id))
      .limit(1);

    if (gleba.length === 0) {
      return NextResponse.json(
        { error: "Gleba não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(gleba[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar gleba" },
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
    const { name, area, notes } = body;

    const updated = await db
      .update(glebas)
      .set({ name, area, notes, updatedAt: new Date() })
      .where(eq(glebas.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Gleba não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar gleba" },
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

    // Archive the gleba
    const archived = await db
      .update(glebas)
      .set({ status: "archived", updatedAt: new Date() })
      .where(eq(glebas.id, id))
      .returning();

    if (archived.length === 0) {
      return NextResponse.json(
        { error: "Gleba não encontrada" },
        { status: 404 }
      );
    }

    // Cascade: archive all talhoes of this gleba
    const glebaTalhoes = await db
      .update(talhoes)
      .set({ status: "archived", updatedAt: new Date() })
      .where(eq(talhoes.glebaId, id))
      .returning({ id: talhoes.id });

    // Cascade: archive all unidades_menores of those talhoes
    for (const talhao of glebaTalhoes) {
      await db
        .update(unidadesMenores)
        .set({ status: "archived", updatedAt: new Date() })
        .where(eq(unidadesMenores.talhaoId, talhao.id));
    }

    return NextResponse.json({ message: "Gleba arquivada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao arquivar gleba" },
      { status: 500 }
    );
  }
}
