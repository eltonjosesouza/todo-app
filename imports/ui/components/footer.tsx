import React from 'react';
import { Container, Box, Text } from '@mantine/core';

export const Footer = () => {
    return (
        <Box style={{
            padding: '20px 0',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px'
        }}>
            <Container>
                <Text size="sm">© 2023 Todo App. Todos os direitos reservados.</Text>
            </Container>
        </Box>
    );
};