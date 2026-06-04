import { NextResponse } from "next/server";
import { db } from "@/db";
import { zonas } from "@/db/schema";
import { eq, asc, SQL } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const conditions: SQL[] = [];
    if (status) {
      conditions.push(eq(zonas.status, status as "active" | "archived"));
    }

    const whereClause = conditions.length > 0 ? conditions[0] : undefined;

    const allZonas = await db
      .select()
      .from(zonas)
      .where(whereClause)
      .orderBy(asc(zonas.order));

    return NextResponse.json(allZonas);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar zonas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, label, description, color, icon, order } = body;

    const newZona = await db
      .insert(zonas)
      .values({ name, label, description, color, icon, order })
      .returning();

    return NextResponse.json(newZona[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar zona" },
      { status: 500 }
    );
  }
}
