CREATE TYPE "public"."status" AS ENUM('active', 'archived');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"total_area" numeric NOT NULL,
	"owner" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "talhoes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"zona_id" text NOT NULL,
	"name" text NOT NULL,
	"area" numeric NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tipo_unidade_modulos" (
	"tipo_unidade_id" uuid NOT NULL,
	"modulo" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tipos_unidade" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unidades_menores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"talhao_id" uuid NOT NULL,
	"tipo_unidade_id" uuid NOT NULL,
	"name" text NOT NULL,
	"area" numeric,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "talhoes" ADD CONSTRAINT "talhoes_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tipo_unidade_modulos" ADD CONSTRAINT "tipo_unidade_modulos_tipo_unidade_id_tipos_unidade_id_fk" FOREIGN KEY ("tipo_unidade_id") REFERENCES "public"."tipos_unidade"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unidades_menores" ADD CONSTRAINT "unidades_menores_talhao_id_talhoes_id_fk" FOREIGN KEY ("talhao_id") REFERENCES "public"."talhoes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unidades_menores" ADD CONSTRAINT "unidades_menores_tipo_unidade_id_tipos_unidade_id_fk" FOREIGN KEY ("tipo_unidade_id") REFERENCES "public"."tipos_unidade"("id") ON DELETE no action ON UPDATE no action;