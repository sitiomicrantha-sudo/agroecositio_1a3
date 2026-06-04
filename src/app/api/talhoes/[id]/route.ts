import { NextResponse } from "next/server";
import { db } from "@/db";
import { talhoes, unidadesMenores } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const talhao = await db
      .select()
      .from(talhoes)
      .where(eq(talhoes.id, id))
      .limit(1);

    if (talhao.length === 0) {
      return NextResponse.json(
        { error: "Talhão não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(talhao[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar talhão" },
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
    const { name, area, zonaId } = body;

    const updated = await db
      .update(talhoes)
      .set({ name, area, zonaId, updatedAt: new Date() })
      .where(eq(talhoes.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Talhão não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar talhão" },
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

    // Archive the talhao
    const archived = await db
      .update(talhoes)
      .set({ status: "archived", updatedAt: new Date() })
      .where(eq(talhoes.id, id))
      .returning();

    if (archived.length === 0) {
      return NextResponse.json(
        { error: "Talhão não encontrado" },
        { status: 404 }
      );
    }

    // Cascade: archive all unidades_menores of this talhao
    await db
      .update(unidadesMenores)
      .set({ status: "archived", updatedAt: new Date() })
      .where(eq(unidadesMenores.talhaoId, id));

    return NextResponse.json({ message: "Talhão arquivado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao arquivar talhão" },
      { status: 500 }
    );
  }
}
