import { Meteor } from "meteor/meteor";
import { TodosCollection } from "./todosCollection";
import { Counts } from "meteor/tmeasday:publish-counts";

const TOTAL_TODOS_COUNT = "totalTodosCount";

Meteor.publish("todos", function publishTodos() {
  if (!this.userId) {
    return this.ready();
  }

  return TodosCollection.find(
    { userId: this.userId },
    { sort: { createdAt: -1 } }
  );
});

Meteor.publish("paginatedTodos", function (page: number, itemsPerPage: number) {
  if (!this.userId) {
    return this.ready();
  }

  const skip = (page - 1) * itemsPerPage;
  return TodosCollection.find(
    { userId: this.userId },
    { skip, limit: itemsPerPage, sort: { createdAt: -1 } }
  );
});

Meteor.publish(TOTAL_TODOS_COUNT, function publishTotalTodosCount() {
  if (!this.userId) {
    return this.ready();
  }

  Counts.publish(
    this,
    TOTAL_TODOS_COUNT,
    TodosCollection.find({ userId: this.userId })
  );
});
