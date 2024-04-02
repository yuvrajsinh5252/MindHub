DO $$ BEGIN
 CREATE TYPE "uploadStatus" AS ENUM('PENDING', 'PROCESSING', 'FAILED', 'SUCCESS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_id" integer NOT NULL,
	"name" text,
	"uploadStatus" "uploadStatus" DEFAULT 'PENDING',
	"type" text,
	"url" text,
	"size" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "creator" (
	"id" integer PRIMARY KEY NOT NULL,
	CONSTRAINT "creator_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" varchar DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "viewer" (
	"id" integer PRIMARY KEY NOT NULL,
	CONSTRAINT "viewer_id_unique" UNIQUE("id")
);
