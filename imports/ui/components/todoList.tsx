import React, { useState } from 'react';
import { useTodos } from '../services/useTodosService';
import { TodoType } from '../../api/todos/todosCollection';
import { Table, Text, Button, Pagination } from '@mantine/core';
import { completeTodo, deleteTodo } from '../services/todoService';

export const TodoList = () => {
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const { todos, isLoading, totalTodos } = useTodos(page, itemsPerPage);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <Table striped highlightOnHover style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <thead>
                    <tr>
                        <th>Date and Time</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo: TodoType) => (
                        <tr key={todo._id}>
                            <td>{todo.createdAt ? new Date(todo.createdAt).toLocaleString() : 'N/A'}</td>
                            <td>{todo.text}</td>
                            <td>{todo.completed ? 'Completed' : 'Pending'}</td>
                            <td>
                                <Button
                                    onClick={() => completeTodo(todo._id)}
                                    color="green"
                                    disabled={todo.completed}
                                >
                                    Complete
                                </Button>
                                {' '}
                                <Button
                                    onClick={() => deleteTodo(todo._id)}
                                    color="red"
                                >
                                    Delete
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