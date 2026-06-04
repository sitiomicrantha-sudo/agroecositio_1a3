import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  console.log("🗑️ Limpando banco...");
  await db.delete(schema.unidadesMenores);
  await db.delete(schema.talhoes);
  await db.delete(schema.properties);

  console.log("🏠 Inserindo propriedade...");
  const [prop] = await db
    .insert(schema.properties)
    .values({
      name: "Sítio do Pica Pau Amarelo",
      location: "A definir",
      totalArea: "11.3",
      owner: "A definir",
    })
    .returning();

  console.log("🌾 Inserindo talhões...");
  const [t1, t2, t3, t4, t5, t6, t7, t8] = await db
    .insert(schema.talhoes)
    .values([
      { propertyId: prop.id, zonaId: "zona_1", name: "Piquete 1", area: "0.8" },
      { propertyId: prop.id, zonaId: "zona_1", name: "Piquete 2", area: "0.5" },
      { propertyId: prop.id, zonaId: "zona_2", name: "Galinheiro", area: "0.3" },
      { propertyId: prop.id, zonaId: "zona_2", name: "Pomar", area: "0.6" },
      { propertyId: prop.id, zonaId: "zona_3", name: "Lavoura", area: "1.5" },
      { propertyId: prop.id, zonaId: "zona_5", name: "APP Interna", area: "0.5" },
      { propertyId: prop.id, zonaId: "zona_3", name: "Milpa", area: "2.1" },
      { propertyId: prop.id, zonaId: "zona_5", name: "Reserva", area: "4.2" },
    ])
    .returning();

  console.log("🌿 Inserindo unidades menores...");
  await db.insert(schema.unidadesMenores).values([
    { talhaoId: t1.id, name: "Canteiro 1", type: "canteiro" },
    { talhaoId: t1.id, name: "Canteiro 2", type: "canteiro" },
    { talhaoId: t1.id, name: "Canteiro 3", type: "canteiro" },
    { talhaoId: t2.id, name: "Canteiro 1", type: "canteiro" },
    { talhaoId: t3.id, name: "Galinheiro Central", type: "galinheiro" },
    { talhaoId: t4.id, name: "Pomar Norte", type: "saf_line" },
    { talhaoId: t4.id, name: "Pomar Sul", type: "saf_line" },
  ]);

  console.log("✅ Seed concluído com sucesso!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
