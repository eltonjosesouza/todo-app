// /client/components/Footer.tsx
import React from 'react';
import { Container, Box, Text } from '@mantine/core';

export const Footer = () => {
    return (
        <Box style={{
            padding: '20px 0',
            backgroundColor: '#f5f5f5',
            display: 'flex', // Adiciona flexbox
            justifyContent: 'center', // Centraliza horizontalmente
            alignItems: 'center', // Centraliza verticalmente
            height: '60px' // Define uma altura para o footer, ajuste conforme necessário
        }}>
            <Container>
                <Text size="sm">© 2023 Todo App. Todos os direitos reservados.</Text>
            </Container>
        </Box>
    );
};