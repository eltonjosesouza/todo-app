// /client/pages/HomePage.tsx
import React from 'react';
import { Container, Space, Title } from '@mantine/core';
import { TodoList } from '../components/todoList';
import { TodoForm } from '../components/todoForm';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const HomePage = () => {


    return (
        <>
            <Header />
            <Container>
                <Title order={1}>Your Todos</Title>
                <TodoForm />
                <Space h="md" />
                <TodoList />
                <Space h="md" />
            </Container>
            <Footer />
        </>
    );
};