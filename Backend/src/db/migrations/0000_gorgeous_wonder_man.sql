DO $$ BEGIN
 CREATE TYPE "uploadStatus" AS ENUM('PENDING', 'PROCESSING', 'FAILED', 'SUCCESS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"uploadStatus" "uploadStatus" DEFAULT 'PENDING',
	"type" text,
	"url" text,
	"size" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"creatorId" integer
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
	"role" varchar,
	"created_at" varchar DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file" ADD CONSTRAINT "file_creatorId_creator_id_fk" FOREIGN KEY ("creatorId") REFERENCES "creator"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
