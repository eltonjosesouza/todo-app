import {
  insertTodo,
  setTodoCompleted,
  removeTodo,
} from "../../imports/api/todos/TodosRpcMethods";

export const completeTodo = async (todoId: string): Promise<void> => {
  try {
    await setTodoCompleted({ todoId, completed: true });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodo = async (todoId: string): Promise<void> => {
  try {
    await removeTodo({ todoId });
  } catch (err) {
    console.error(err);
  }
};

export const insertTodos = (text: string) => {
  return new Promise<void>((resolve, reject) => {
    insertTodo({ text })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject();
      });
  });
};
