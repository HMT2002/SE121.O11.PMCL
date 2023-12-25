import React from 'react';

import AppRouter from './pages/AppRouter.js';
import AppLayout from './UIComponents/Commons/Layout.js';
import AuthContext, { AuthContextProvider } from './contexts/auth-context';

import './App.css';
import './Styles/Pages.css';

function App() {
  return (
    <React.Fragment>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;
