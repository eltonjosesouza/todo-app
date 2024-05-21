import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TodosCollection } from "../api/todos/TodosCollection";
import { SUBSCRIPTIONS } from "../utils/Constants";

declare var Counts: {
  get: (publicationName: string) => number;
};

const DEFAULT_DATA = {
  todos: [],
  isLoading: true,
  totalTodos: 0,
  error: null,
};

export const useTodos = (activePage: number, itemsPerPage: number) => {
  const { todos, isLoading, totalTodos, error } = useTracker(() => {
    if (!Meteor.user()) {
      return DEFAULT_DATA;
    }

    const subsHandle = Meteor.subscribe(
      SUBSCRIPTIONS.PAGINATED_TODOS,
      activePage,
      itemsPerPage
    );
    const totalHandle = Meteor.subscribe(SUBSCRIPTIONS.TOTAL_TODOS_COUNT);

    if (!subsHandle.ready() || !totalHandle.ready()) {
      return { ...DEFAULT_DATA, isLoading: true };
    }

    try {
      const todos = TodosCollection.find(
        {},
        { sort: { createdAt: -1 } }
      ).fetch();
      const totalTodos = Counts.get(SUBSCRIPTIONS.TOTAL_TODOS_COUNT);
      return { todos, isLoading: false, totalTodos, error: null };
    } catch (e) {
      console.error("Error fetching todos:", e);
      return { ...DEFAULT_DATA, error: e.toString() };
    }
  }, [activePage, itemsPerPage]);

  return { todos, isLoading, totalTodos, error };
};
