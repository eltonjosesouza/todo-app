import React from 'react';
import { useTodos } from '../../imports/ui/useTodos';
import { TodoType } from '../../imports/api/TodosCollection';
import { List, Text, Button, Group } from '@mantine/core';
import { Meteor } from 'meteor/meteor';

export const TodoList = () => {
    const { todos, isLoading } = useTodos();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    const handleComplete = (todoId: string) => {
        Meteor.call('todos.setCompleted', todoId, true, (error: any) => {
            if (error) {
                alert('Error setting todo as completed. Please try again.');
            }
        });
    };

    return (
        <List>
            {todos.map((todo: TodoType) => (
                <List.Item key={todo._id}>
                    <Group position="apart">
                        <Text>{todo.text}</Text>
                        <Button onClick={() => handleComplete(todo._id)} color="green">Complete</Button>
                    </Group>
                </List.Item>
            ))}
        </List>
    );
};