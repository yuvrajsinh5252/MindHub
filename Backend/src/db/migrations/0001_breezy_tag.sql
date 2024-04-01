CREATE TABLE IF NOT EXISTS "viewer" (
	"id" integer PRIMARY KEY NOT NULL,
	CONSTRAINT "viewer_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "userId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file" ADD CONSTRAINT "file_userId_creator_id_fk" FOREIGN KEY ("userId") REFERENCES "creator"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";