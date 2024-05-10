// /client/pages/SignupPage.tsx
import React from 'react';
import { Button, Container, TextInput, Title, PasswordInput, Space, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';

export const SignupPage = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleSignup = (values: typeof form.values) => {
        console.log(values);
        // Implement signup logic here
        navigate('/');
    };

    return (
        <Container size={420} my={40}>
            <Title align="center">Sign Up</Title>
            <form onSubmit={form.onSubmit(handleSignup)}>
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
                <Button fullWidth type="submit">Sign Up</Button>
                <Space h="md" />
                <Text align="center">
                    Have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                </Text>
            </form>
        </Container>
    );
};