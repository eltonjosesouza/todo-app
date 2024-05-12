// /client/components/Header.tsx
import React from 'react';
import { Container, Group, Title, Box } from '@mantine/core';
import { LogoutButton } from './LogoutButton'; // Adjust the path as necessary

export const Header = () => {
    return (
        <Box style={{ padding: '20px 0', backgroundColor: '#f5f5f5', textAlign: 'right' }}>
            <Container>
                <Group style={{ justifyContent: 'space-between' }}>
                    <Title order={2}>Todo App</Title>
                    <LogoutButton /> {/* This will place the LogoutButton to the right */}
                </Group>
            </Container>
        </Box>
    );
};