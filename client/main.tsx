import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

import '@mantine/core/styles.css';
import { HomePage } from './pages/HomePage';
import { useTracker } from 'meteor/react-meteor-data';

// Define a wrapper component for your private route's content
const PrivateElement = ({ component: Component }) => {
  const isAuthenticated = useTracker(() => Meteor.userId() !== null);

  // If authenticated, render the component; otherwise, redirect to login
  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container!); // Ensure the container exists
  root.render(
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route path="/" element={<PrivateElement component={HomePage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
});
