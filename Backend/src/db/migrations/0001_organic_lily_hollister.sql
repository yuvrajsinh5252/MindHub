ALTER TABLE "users" ADD COLUMN "created_at" text DEFAULT 'now()' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "email";