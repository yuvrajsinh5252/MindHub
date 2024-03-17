import { serial, text, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    email: text("email").default(''),
    role: text("role").notNull().default('not assigned')
});