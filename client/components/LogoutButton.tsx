import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Meteor.logout((error) => {
            if (error) {
                console.log('Logout error:', error);
            } else {
                navigate('/login');
            }
        });
    };

    return (
        <Button onClick={handleLogout} color="red">
            Logout
        </Button>
    );
};