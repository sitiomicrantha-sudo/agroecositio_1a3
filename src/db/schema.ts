import {
  pgTable,
  uuid,
  text,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["active", "archived"]);

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

export const tiposUnidade = pgTable("tipos_unidade", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tipoUnidadeModulos = pgTable("tipo_unidade_modulos", {
  tipoUnidadeId: uuid("tipo_unidade_id")
    .references(() => tiposUnidade.id)
    .notNull(),
  modulo: text("modulo").notNull(),
});

export const unidadesMenores = pgTable("unidades_menores", {
  id: uuid("id").defaultRandom().primaryKey(),
  talhaoId: uuid("talhao_id")
    .references(() => talhoes.id)
    .notNull(),
  tipoUnidadeId: uuid("tipo_unidade_id")
    .references(() => tiposUnidade.id)
    .notNull(),
  name: text("name").notNull(),
  area: numeric("area"),
  status: statusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
