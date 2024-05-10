import React from 'react';
import { Button, Container, TextInput, Title, PasswordInput, Space, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Meteor } from 'meteor/meteor';

const signupSchema = z.object({
    email: z.string().email({ message: "Endereço de email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
        .max(16, { message: "A senha não pode ter mais de 16 caracteres" })
        .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
        .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
        .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
        .regex(/[@$!%*?&]/, { message: "A senha deve conter pelo menos um caractere especial (@$!%*?&)" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

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