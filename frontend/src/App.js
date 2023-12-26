import React from 'react';

import AppRouter from './pages/AppRouter.js';
import AppLayout from './UIComponents/Commons/Layout.js';
import AuthContext, { AuthContextProvider } from './contexts/auth-context';
import Layout from './components/layout/Layout';

import './App.css';
import './Styles/Pages.css';

function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <AppRouter />
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
