import {
  pgTable,
  uuid,
  text,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["active", "archived"]);

export const unidadeTypeEnum = pgEnum("unidade_type", [
  "canteiro",
  "saf_line",
  "piquete",
  "galinheiro",
  "composteira",
  "estufa",
  "outro",
]);

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  totalArea: numeric("total_area").notNull(),
  owner: text("owner").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const talhoes = pgTable("talhoes", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyId: uuid("property_id")
    .references(() => properties.id)
    .notNull(),
  zonaId: text("zona_id").notNull(),
  name: text("name").notNull(),
  area: numeric("area").notNull(),
  status: statusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const unidadesMenores = pgTable("unidades_menores", {
  id: uuid("id").defaultRandom().primaryKey(),
  talhaoId: uuid("talhao_id")
    .references(() => talhoes.id)
    .notNull(),
  name: text("name").notNull(),
  type: unidadeTypeEnum("type").notNull(),
  status: statusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
