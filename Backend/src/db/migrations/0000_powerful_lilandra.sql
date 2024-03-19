CREATE TABLE IF NOT EXISTS "creator" (
	"id" serial PRIMARY KEY NOT NULL,
	"creatorId" integer NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT 'not assigned' NOT NULL,
	"created_at" text DEFAULT now(),
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
