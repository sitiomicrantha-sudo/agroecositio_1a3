import { NextResponse } from "next/server";
import { db } from "@/db";
import { unidadesMenores, talhoes } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { validateAreaFilhos } from "@/lib/limits";

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
    const { talhaoId, tipoUnidadeId, name, area } = body;

    const newUnidade = await db
      .insert(unidadesMenores)
      .values({ talhaoId, tipoUnidadeId, name, area })
      .returning();

    const warnings: string[] = [];

    if (area) {
      const [talhao] = await db
        .select({ area: talhoes.area })
        .from(talhoes)
        .where(eq(talhoes.id, talhaoId))
        .limit(1);

      if (talhao?.area) {
        const existingUnidades = await db
          .select({ area: unidadesMenores.area })
          .from(unidadesMenores)
          .where(eq(unidadesMenores.talhaoId, talhaoId));

        const allAreas = [
          ...existingUnidades.map((u) => u.area ? parseFloat(u.area) : null),
          parseFloat(area),
        ];

        const result = validateAreaFilhos(parseFloat(talhao.area), allAreas);
        if (result.warning) {
          warnings.push(result.warning);
        }
      }
    }

    return NextResponse.json({ ...newUnidade[0], warnings }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar unidade menor" },
      { status: 500 }
    );
  }
}
