import React, { useState } from 'react';
import { useTodos } from '../../imports/ui/useTodos';
import { TodoType } from '../../imports/api/TodosCollection';
import { Table, Text, Button, Pagination } from '@mantine/core';
import { Meteor } from 'meteor/meteor';

export const TodoList = () => {
    const itemsPerPage = 10; // Define itemsPerPage before useTodos
    const [page, setPage] = useState(1); // Initialize page state before useTodos
    const { todos, isLoading, totalTodos } = useTodos(page, itemsPerPage); // Now useTodos is called with already defined variables

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
        <>
            <Table striped highlightOnHover style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <thead>
                    <tr>
                        <th>Date and Time</th> {/* Atualizado para incluir hora */}
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo: TodoType) => (
                        <tr key={todo._id}>
                            {/* Atualizado para incluir a data e a hora */}
                            <td>{todo.createdAt ? new Date(todo.createdAt).toLocaleString() : 'N/A'}</td>
                            <td>{todo.text}</td>
                            <td>{todo.completed ? 'Completed' : 'Pending'}</td>
                            <td>
                                <Button
                                    onClick={() => handleComplete(todo._id)}
                                    color="green"
                                    disabled={todo.completed}
                                >
                                    Complete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                value={page}
                onChange={setPage}
                total={Math.ceil(totalTodos / itemsPerPage)}
                style={{ marginTop: '20px' }}
            />
        </>
    );
};