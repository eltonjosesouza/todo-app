import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';


export const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        Meteor.logout();
        navigate('/login');

    };

    return (
        <Button onClick={handleLogout} color="red">
            Logout
        </Button>
    );
};