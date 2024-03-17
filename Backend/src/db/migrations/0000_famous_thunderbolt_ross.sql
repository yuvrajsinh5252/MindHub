CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text DEFAULT '',
	"role" text DEFAULT 'not assigned' NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
