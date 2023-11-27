import React from 'react';

import { Routes, Route } from 'react-router-dom';

import DefaultPage from './DefaultPage';

import { GoogleOAuthProvider } from '@react-oauth/google';

const AppRouter = () => {
  return (
    <GoogleOAuthProvider clientId="1031226840176-2hfbvd0am0ea3hcapmapeea1tc4ijn0n.apps.googleusercontent.com">
      <Routes>
        <Route path="/" exact element={<DefaultPage />} />
        <Route path="/default" exact element={<DefaultPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default AppRouter;
