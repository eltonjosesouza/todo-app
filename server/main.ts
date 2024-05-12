import { Meteor } from "meteor/meteor";
import "../imports/api/todos/TodosRpcMethods"; // Make sure this matches the file's casing
import "../imports/api/users/UserMethods";
import "./publications/todos";

Meteor.startup(async () => {});
