import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {todos} from"./schema.js";


export const todoselectschema =createSelectSchema(todos);
export const todoInsertchema = createInsertSchema(todos);