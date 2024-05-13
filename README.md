# Todo App

This Todo App is a full-stack application built with MeteorJS, React, and TypeScript. It leverages the Mantine library for UI components, React Router for navigation, and integrates with MongoDB for data storage. The application allows users to sign up, log in, and manage their todo list.

## Structure

The application is structured as follows:

- `client`: Contains the React frontend components and pages.
  - `components`: Reusable React components like `TodoForm` and `TodoList`.
  - `pages`: React components representing pages (`HomePage`, `LoginPage`, `SignupPage`).
  - `main.tsx`: Entry point for the React application, sets up routing.
- `imports`: Shared logic and MongoDB collection definitions.
  - `api`: Definitions for the MongoDB collection and Meteor methods.
  - `ui`: Custom React hooks, e.g., `useTodos` for fetching todo items.
- `server`: Contains the Meteor server-side logic.
  - `main.ts`: Server entry point.
  - `publications`: Meteor publications for subscribing to todo items.
- `tests`: Contains tests for the application.
- `package.json`: Defines npm dependencies and scripts.
- `tsconfig.json`: Configuration for TypeScript.

## Setup

To run this application, you need to have Meteor installed. If you haven't installed Meteor yet, follow the instructions on the [official Meteor website](https://www.meteor.com/developers/install).

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:

```bash
meteor npm install
```

Run the application:
```bash
meteor
```
The application will be available at http://localhost:3000.

Features
User authentication (sign up and log in).
Create, view, and complete todos.
Responsive UI with Mantine components.
Technologies
MeteorJS for the full-stack platform.
React for the frontend.
Mantine for UI components.
React Router for navigation.
MongoDB for the database.
TypeScript for static type checking.
Contributing
Contributions are welcome! Please feel free to submit a pull request or create an issue for bugs, questions, or new features.

License
This project is open source and available under the MIT License.
