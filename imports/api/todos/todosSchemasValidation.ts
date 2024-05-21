import { z } from "zod";


const TodoInsertSchema = z.object({
  text: z.string(),
});

const TodoRemoveSchema = z.object({
  todoId: z.string(),
});


const TodoSetCompletedSchema = z.object({
  todoId: z.string(),
  completed: z.boolean(),
});

export { TodoInsertSchema, TodoRemoveSchema, TodoSetCompletedSchema };
