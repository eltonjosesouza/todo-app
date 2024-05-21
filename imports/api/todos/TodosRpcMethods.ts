import { Meteor } from "meteor/meteor";
import { TodosCollection } from "./todosCollection";
import {
  TodoInsertSchema,
  TodoRemoveSchema,
  TodoSetCompletedSchema,
} from "./todosSchemasValidation";
import { createMethod } from "grubba-rpc";

function insertTodoOperation({ text }: { text: string }) {
  if (!Meteor.userId()) {
    throw new Meteor.Error("Not authorized.");
  }

  const todo = {
    text,
    userId: Meteor.userId(),
    createdAt: new Date(),
    completed: false,
  };

  return TodosCollection.insert(todo);
}

function removeTodoOperation({ todoId }: { todoId: string }) {
  if (!Meteor.userId()) {
    throw new Meteor.Error("Not authorized.");
  }

  return TodosCollection.remove(todoId);
}

function setTodoCompletedOperation({
  todoId,
  completed,
}: {
  todoId: string;
  completed: boolean;
}) {
  if (!Meteor.userId()) {
    throw new Meteor.Error("Not authorized.");
  }

  return TodosCollection.update(todoId, { $set: { completed } });
}

export const insertTodo = createMethod(
  "todos.insert",
  TodoInsertSchema,
  insertTodoOperation
);
export const removeTodo = createMethod(
  "todos.remove",
  TodoRemoveSchema,
  removeTodoOperation
);
export const setTodoCompleted = createMethod(
  "todos.setCompleted",
  TodoSetCompletedSchema,
  setTodoCompletedOperation
);
