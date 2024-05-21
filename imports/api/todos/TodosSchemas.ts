import { z } from "zod";

/**
 * Schema for inserting a new todo item.
 * Ensures that the text for the new todo item is a string.
 */
const TodoInsertSchema = z.object({
  text: z.string(),
});

/**
 * Schema for removing a todo item.
 * Validates that the todoId for the item to be removed is a string.
 */
const TodoRemoveSchema = z.object({
  todoId: z.string(),
});

/**
 * Schema for setting a todo item's completion status.
 * Validates that the todoId is a string and completed is a boolean.
 */
const TodoSetCompletedSchema = z.object({
  todoId: z.string(),
  completed: z.boolean(),
});

export { TodoInsertSchema, TodoRemoveSchema, TodoSetCompletedSchema };
