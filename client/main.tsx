import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { useTracker } from 'meteor/react-meteor-data';



import '@mantine/core/styles.css';


const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useTracker(() => Meteor.userId() !== null);

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  if (!container) throw new Error('Failed to find the root element');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route path="/" element={<PrivateRoute component={HomePage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
});