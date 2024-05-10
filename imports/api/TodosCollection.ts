import { Mongo } from "meteor/mongo";
import { z } from "zod";

export const TodoSchema = z.object({
  _id: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  completed: z.boolean(),
});

export type TodoType = z.infer<typeof TodoSchema>;

export const TodosCollection = new Mongo.Collection<TodoType>("todos");
