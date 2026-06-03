import { NextResponse } from "next/server";
import { db } from "@/db";
import { talhoes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const glebaId = searchParams.get("glebaId");

    if (!glebaId) {
      return NextResponse.json(
        { error: "glebaId é obrigatório" },
        { status: 400 }
      );
    }

    const allTalhoes = await db
      .select()
      .from(talhoes)
      .where(eq(talhoes.glebaId, glebaId));

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
    const { glebaId, name, area } = body;

    const newTalhao = await db
      .insert(talhoes)
      .values({ glebaId, name, area })
      .returning();

    return NextResponse.json(newTalhao[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar talhão" },
      { status: 500 }
    );
  }
}
