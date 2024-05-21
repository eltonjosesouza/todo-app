import React from 'react';
import { Button, Container, TextInput, Title, PasswordInput, Space, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema } from '../utils/validationSchemas';
import { Meteor } from 'meteor/meteor';

export const SignupPage = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: zodResolver(signupSchema),
    });

    const handleSignup = (values: typeof form.values) => {
        Meteor.call('user.signup', values, (error) => {
            if (error) {
                console.log('Erro ao cadastrar usuário:', error);
            } else {
                console.log('Usuário cadastrado com sucesso!');
                navigate('/');
            }
        });
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
                <PasswordInput
                    required
                    label="Password confirmation"
                    placeholder="Confirm your password"
                    {...form.getInputProps('confirmPassword')}
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