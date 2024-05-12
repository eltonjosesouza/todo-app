import { Meteor } from "meteor/meteor";
import { TodosCollection } from "./TodosCollection";
import {
  TodoInsertSchema,
  TodoRemoveSchema,
  TodoSetCompletedSchema,
} from "./TodosSchemas";
import { createMethod } from "grubba-rpc";

const insertTodo = createMethod(
  "todos.insert",
  TodoInsertSchema,
  ({ text }) => {
    return new Promise((resolve, reject) => {
      if (!Meteor.userId()) {
        reject(new Meteor.Error("Not authorized."));
      } else {
        const todo = {
          text,
          userId: Meteor.userId(),
          createdAt: new Date(),
          completed: false,
        };
        TodosCollection.insert(todo, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  }
);

const removeTodo = createMethod(
  "todos.remove",
  TodoRemoveSchema,
  ({ todoId }) => {
    return new Promise((resolve, reject) => {
      if (!Meteor.userId()) {
        reject(new Meteor.Error("Not authorized."));
      } else {
        TodosCollection.remove(todoId, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  }
);

const setTodoCompleted = createMethod(
  "todos.setCompleted",
  TodoSetCompletedSchema,
  ({ todoId, completed }) => {
    return new Promise((resolve, reject) => {
      if (!Meteor.userId()) {
        reject(new Meteor.Error("Not authorized."));
      } else {
        TodosCollection.update(
          todoId,
          { $set: { completed } },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  }
);

export { insertTodo, removeTodo, setTodoCompleted };
