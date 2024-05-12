// /client/pages/HomePage.tsx
import React, { useState } from 'react';
import { Button, Container, Modal, Space, Title } from '@mantine/core';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';
import { Header } from '../components/Header'; // Importe o Header
import { Footer } from '../components/Footer'; // Importe o Footer

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