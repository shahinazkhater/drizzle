//جداول وعلاقات

 
import {

  pgTable,
primaryKey,
  serial,
  timestamp,
  varchar,
  text,
  boolean,
} from "drizzle-orm/pg-core";



export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title : varchar("title",{length:255}).notNull(),
    body: text("body"),
    done : boolean("done") .default(false),
    created_at : timestamp("created_at").defaultNow(),

});

