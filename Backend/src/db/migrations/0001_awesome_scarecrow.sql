ALTER TABLE "file" ADD COLUMN "creatorId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "file" DROP COLUMN IF EXISTS "creator_id";