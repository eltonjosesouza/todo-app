import { Meteor } from "meteor/meteor";
import { TodosCollection, TodoSchema } from "./TodosCollection";

Meteor.methods({
  "todos.insert"(text: string) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const todo = {
      text,
      userId: this.userId,
      createdAt: new Date(),
      completed: false,
    };

    TodoSchema.parse(todo); // Validate todo with Zod

    TodosCollection.insert(todo);
  },

  "todos.remove"(todoId: string) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TodosCollection.remove(todoId);
  },

  "todos.setCompleted"(todoId: string, completed: boolean) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TodosCollection.update(todoId, { $set: { completed } });
  },
});
