import { NextResponse } from "next/server";
import { db } from "@/db";
import { tiposUnidade } from "@/db/schema";

export async function GET() {
  try {
    const allTipos = await db
      .select()
      .from(tiposUnidade)
      .orderBy(tiposUnidade.name);

    return NextResponse.json(allTipos);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar tipos de unidade" },
      { status: 500 }
    );
  }
}
