import { NextResponse } from "next/server";
import { db } from "@/db";
import { unidadesMenores } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const talhaoId = searchParams.get("talhaoId");

    if (!talhaoId) {
      return NextResponse.json(
        { error: "talhaoId é obrigatório" },
        { status: 400 }
      );
    }

    const allUnidades = await db
      .select()
      .from(unidadesMenores)
      .where(eq(unidadesMenores.talhaoId, talhaoId));

    return NextResponse.json(allUnidades);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar unidades menores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { talhaoId, name, type } = body;

    const newUnidade = await db
      .insert(unidadesMenores)
      .values({ talhaoId, name, type })
      .returning();

    return NextResponse.json(newUnidade[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar unidade menor" },
      { status: 500 }
    );
  }
}
