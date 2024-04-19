CREATE TABLE IF NOT EXISTS "course" (
	"creator_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"course_url" text NOT NULL,
	"file_id" varchar NOT NULL,
	"description" text,
	"course_tags" text,
	"category" text,
	"created_at" varchar DEFAULT now(),
	CONSTRAINT "course_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "file" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "file" DROP COLUMN IF EXISTS "creatorId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_file_id_file_id_fk" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
