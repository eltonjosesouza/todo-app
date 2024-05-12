import { Meteor } from "meteor/meteor";
import { TodosCollection } from "../../imports/api/TodosCollection";
import { Counts } from "meteor/tmeasday:publish-counts";

Meteor.publish("todos", function publishTodos() {
  if (!this.userId) {
    return this.ready();
  }

  return TodosCollection.find(
    { userId: this.userId },
    { sort: { createdAt: -1 } }
  );
});

Meteor.publish("paginatedTodos", function (page, itemsPerPage) {
  const skip = (page - 1) * itemsPerPage;
  return TodosCollection.find(
    {},
    { skip, limit: itemsPerPage, sort: { createdAt: -1 } }
  );
});

Meteor.publish("totalTodosCount", function publishTotalTodosCount() {
  if (!this.userId) {
    return this.ready();
  }

  Counts.publish(
    this,
    "totalTodosCount",
    TodosCollection.find({ userId: this.userId })
  );
});
