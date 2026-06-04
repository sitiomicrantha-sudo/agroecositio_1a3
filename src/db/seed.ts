import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  console.log("🗑️ Limpando banco...");
  await db.delete(schema.tipoUnidadeModulos);
  await db.delete(schema.unidadesMenores);
  await db.delete(schema.talhoes);
  await db.delete(schema.tiposUnidade);
  await db.delete(schema.properties);

  console.log("🏠 Inserindo propriedade...");
  const [prop] = await db
    .insert(schema.properties)
    .values({
      name: "Sítio do Pica Pau Amarelo",
      location: "A definir",
      totalArea: "113000",
      owner: "A definir",
    })
    .returning();

  console.log("🌾 Inserindo talhões...");
  const [t1, t2, t3, t4, t5, t6, t7, t8] = await db
    .insert(schema.talhoes)
    .values([
      { propertyId: prop.id, zonaId: "zona_1", name: "Piquete 1", area: "8000" },
      { propertyId: prop.id, zonaId: "zona_1", name: "Piquete 2", area: "5000" },
      { propertyId: prop.id, zonaId: "zona_2", name: "Galinheiro", area: "3000" },
      { propertyId: prop.id, zonaId: "zona_2", name: "Pomar", area: "6000" },
      { propertyId: prop.id, zonaId: "zona_3", name: "Lavoura", area: "15000" },
      { propertyId: prop.id, zonaId: "zona_5", name: "APP Interna", area: "5000" },
      { propertyId: prop.id, zonaId: "zona_3", name: "Milpa", area: "21000" },
      { propertyId: prop.id, zonaId: "zona_5", name: "Reserva", area: "42000" },
    ])
    .returning();

  console.log("🏷️ Inserindo tipos de unidade...");
  const [canteiro, safLine, piquete, galinheiro, composteira, estufa, medicinal, aromatica, outro] = await db
    .insert(schema.tiposUnidade)
    .values([
      { name: "Canteiro", description: "Canteiro de cultivo" },
      { name: "Linha de SAF", description: "Linha de sistema agroflorestal" },
      { name: "Piquete", description: "Piquete de pastagem" },
      { name: "Galinheiro", description: "Criatório de galinhas" },
      { name: "Composteira", description: "Unidade de compostagem" },
      { name: "Estufa", description: "Estufa de cultivo" },
      { name: "Medicinal", description: "Plantio de plantas medicinais" },
      { name: "Aromática", description: "Plantio de plantas aromáticas" },
      { name: "Outro", description: "Outro tipo de unidade" },
    ])
    .returning();

  console.log("📦 Inserindo associações tipo-módulo...");
  await db.insert(schema.tipoUnidadeModulos).values([
    { tipoUnidadeId: canteiro.id, modulo: "horta" },
    { tipoUnidadeId: galinheiro.id, modulo: "galinha_caipira" },
    { tipoUnidadeId: composteira.id, modulo: "compostagem" },
  ]);

  console.log("🌿 Inserindo unidades menores...");
  await db.insert(schema.unidadesMenores).values([
    { talhaoId: t1.id, tipoUnidadeId: canteiro.id, name: "Canteiro 1", area: "30" },
    { talhaoId: t1.id, tipoUnidadeId: canteiro.id, name: "Canteiro 2", area: "25" },
    { talhaoId: t1.id, tipoUnidadeId: canteiro.id, name: "Canteiro 3", area: "35" },
    { talhaoId: t2.id, tipoUnidadeId: canteiro.id, name: "Canteiro 1", area: "40" },
    { talhaoId: t3.id, tipoUnidadeId: galinheiro.id, name: "Galinheiro Central", area: "50" },
    { talhaoId: t4.id, tipoUnidadeId: safLine.id, name: "Pomar Norte" },
    { talhaoId: t4.id, tipoUnidadeId: safLine.id, name: "Pomar Sul" },
  ]);

  console.log("✅ Seed concluído com sucesso!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
