import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TodosCollection } from "../api/TodosCollection";

export const useTodos = () => {
  const { todos, isLoading } = useTracker(() => {
    const noDataAvailable = { todos: [], isLoading: true };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("todos");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const todos = TodosCollection.find(
      { userId: Meteor.userId() },
      { sort: { createdAt: -1 } }
    ).fetch();
    return { todos, isLoading: false };
  });

  return { todos, isLoading };
};
