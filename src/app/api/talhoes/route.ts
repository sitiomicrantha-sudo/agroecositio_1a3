import { NextResponse } from "next/server";
import { db } from "@/db";
import { talhoes, properties } from "@/db/schema";
import { eq, and, count, sql } from "drizzle-orm";
import { validateAreaFilhos } from "@/lib/limits";

const MAX_TALHOES_POR_PROPRIEDADE = 10;

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

    const allTalhoes = await db
      .select()
      .from(talhoes)
      .where(eq(talhoes.propertyId, propertyId));

    return NextResponse.json(allTalhoes);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar talhões" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, name, area, zonaId } = body;

    const [{ total }] = await db
      .select({ total: count() })
      .from(talhoes)
      .where(
        and(eq(talhoes.propertyId, propertyId), eq(talhoes.status, "active"))
      );

    if (Number(total) >= MAX_TALHOES_POR_PROPRIEDADE) {
      return NextResponse.json(
        {
          error: `Limite de ${MAX_TALHOES_POR_PROPRIEDADE} talhões por propriedade atingido.`,
        },
        { status: 409 }
      );
    }

    const newTalhao = await db
      .insert(talhoes)
      .values({ propertyId, name, area, zonaId })
      .returning();

    const warnings: string[] = [];

    if (area) {
      const [prop] = await db
        .select({ totalArea: properties.totalArea })
        .from(properties)
        .where(eq(properties.id, propertyId))
        .limit(1);

      if (prop?.totalArea) {
        const result = validateAreaFilhos(
          parseFloat(prop.totalArea),
          [parseFloat(area)]
        );
        if (result.warning) {
          warnings.push(result.warning);
        }
      }
    }

    return NextResponse.json({ ...newTalhao[0], warnings }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar talhão" },
      { status: 500 }
    );
  }
}
