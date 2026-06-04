CREATE TYPE "public"."status" AS ENUM('active', 'archived');--> statement-breakpoint
CREATE TYPE "public"."unidade_type" AS ENUM('canteiro', 'saf_line', 'piquete', 'galinheiro', 'composteira', 'estufa', 'outro');--> statement-breakpoint
CREATE TABLE "glebas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"name" text NOT NULL,
	"area" numeric NOT NULL,
	"notes" text,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
	"gleba_id" uuid NOT NULL,
	"zona_id" uuid NOT NULL,
	"name" text NOT NULL,
	"area" numeric NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unidades_menores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"talhao_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" "unidade_type" NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zonas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"label" text NOT NULL,
	"description" text,
	"color" text NOT NULL,
	"icon" text NOT NULL,
	"order" integer NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "glebas" ADD CONSTRAINT "glebas_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "talhoes" ADD CONSTRAINT "talhoes_gleba_id_glebas_id_fk" FOREIGN KEY ("gleba_id") REFERENCES "public"."glebas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "talhoes" ADD CONSTRAINT "talhoes_zona_id_zonas_id_fk" FOREIGN KEY ("zona_id") REFERENCES "public"."zonas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unidades_menores" ADD CONSTRAINT "unidades_menores_talhao_id_talhoes_id_fk" FOREIGN KEY ("talhao_id") REFERENCES "public"."talhoes"("id") ON DELETE no action ON UPDATE no action;