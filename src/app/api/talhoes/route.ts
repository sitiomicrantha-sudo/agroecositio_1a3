import { NextResponse } from "next/server";
import { db } from "@/db";
import { talhoes } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";

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

    return NextResponse.json(newTalhao[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar talhão" },
      { status: 500 }
    );
  }
}
