declare var Counts: {
  get: (publicationName: string) => number;
};

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TodosCollection } from "../api/TodosCollection";

export const useTodos = (activePage: number, itemsPerPage: number) => {
  const { todos, isLoading, totalTodos } = useTracker(() => {
    const noDataAvailable = { todos: [], isLoading: true, totalTodos: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    Meteor.subscribe("totalTodosCount");

    const handler = Meteor.subscribe(
      "paginatedTodos",
      activePage,
      itemsPerPage
    );

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const todos = TodosCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    // Assuming you have a way to obtain the total count of todos (could be another publication or method)
    const totalTodos = Counts.get("totalTodosCount"); // Example, needs to be implemented
    return { todos, isLoading: false, totalTodos };
  });

  return { todos, isLoading, totalTodos };
};
