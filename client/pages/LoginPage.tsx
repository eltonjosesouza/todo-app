import React from 'react';
import { Button, Container, TextInput, Title, PasswordInput, Space, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Meteor } from 'meteor/meteor';

export const LoginPage = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = (values: typeof form.values) => {
        const { email, password } = values;
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                console.log(error);
                // Aqui você pode tratar o erro, por exemplo, mostrando uma mensagem para o usuário
            } else {
                console.log('Login successful');
                navigate('/'); // Redireciona o usuário para a página inicial após o login bem-sucedido
            }
        });
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
                <Space h="md" />
                <Text align="center">
                    Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign up</Link>
                </Text>
            </form>
        </Container>
    );
};