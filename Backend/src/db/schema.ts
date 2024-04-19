import { sql } from "drizzle-orm";
import {
  text,
  pgTable,
  integer,
  pgEnum,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const uploadStatusEnum = pgEnum("uploadStatus", [
  "PENDING",
  "PROCESSING",
  "FAILED",
  "SUCCESS",
]);

export const users = pgTable("users", {
  id: varchar("id").unique().primaryKey(),
  name: varchar("name").unique().notNull(),
  createdAt: varchar("created_at").default(sql`now()`),
});

export const viewer = pgTable("viewer", {
  id: integer("id").unique().primaryKey(),
});

export const creators = pgTable("creators", {
  id: integer("id").unique().primaryKey(),
});

export const File = pgTable("file", {
  id: varchar("id").primaryKey(),
  name: text("name"),

  uploadStatus: uploadStatusEnum("uploadStatus").default("PENDING"),

  type: text("type"),
  url: text("url"),
  size: integer("size"),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const course = pgTable("course", {
  creator_id: integer("creator_id").notNull(),
  name: varchar("name").unique().notNull(),
  courseUrl: text("course_url").notNull(),
  file_id: varchar("file_id")
    .notNull()
    .references(() => File.id),
  description: text("description"),
  courseTags: text("course_tags"),
  category: text("category"),
  createdAt: varchar("created_at").default(sql`now()`),
});
