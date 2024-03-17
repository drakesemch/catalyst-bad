// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => name);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    uuid: varchar("uuid", { length: 128 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
    firstName: varchar("first_name", { length: 16 }),
    lastName: varchar("last_name", { length: 16 }),
    email: varchar("email", { length: 64 }),
    password: varchar("password", { length: 256 }),
    setup: varchar("setup", { length: 32 }),
  },
  (col) => ({
    idIndex: index("id_idx").on(col.id),
  }),
);
