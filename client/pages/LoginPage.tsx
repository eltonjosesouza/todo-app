// /client/pages/LoginPage.tsx
import React from 'react';
import { Button, Container, TextInput, Title, PasswordInput, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = (values: typeof form.values) => {
        console.log(values);
        // Implement login logic here
        navigate('/');
    };

    return (
        <Container size={420} my={40}>
            <Title align="center">Login</Title>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <TextInput
                    required
                    label="Email"
                    placeholder="you@example.com"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    {...form.getInputProps('password')}
                />
                <Space h="md" />
                <Button fullWidth type="submit">Login</Button>
            </form>
        </Container>
    );
};