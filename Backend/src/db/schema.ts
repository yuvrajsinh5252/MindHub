import { sql } from "drizzle-orm";
import {
  serial,
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

export const creator = pgTable("creator", {
  id: integer("id").unique().primaryKey(),
});

export const viewer = pgTable("viewer", {
  id: integer("id").unique().primaryKey(),
});

export const File = pgTable("file", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => creator.id),
  name: text("name"),

  uploadStatus: uploadStatusEnum("uploadStatus").default("PENDING"),

  type: text("type"),
  url: text("url"),
  size: integer("size"),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt").notNull(),
  creatorId: integer("creatorId").references(() => creator.id),
});
