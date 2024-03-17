import { sql } from 'drizzle-orm';
import { serial, text, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    role: text("role").notNull().default('not assigned'),
    createdAt: text('created_at').default(sql`now()`)
});