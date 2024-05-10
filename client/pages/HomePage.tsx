import React from 'react';
import { Container, Space, Title } from '@mantine/core';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';

export const HomePage = () => {
    return (
        <Container>
            <Title order={1}>Your Todos</Title>
            <TodoForm />
            <Space h="md" />
            <TodoList />
        </Container>
    );
};