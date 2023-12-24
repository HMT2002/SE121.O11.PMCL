import React from 'react';

import AppRouter from './pages/AppRouter.js';
import AppLayout from './UIComponents/Commons/Layout.js';

import './App.css';
import './Styles/Pages.css';

function App() {
  return (
    <React.Fragment>
      <AppRouter />
    </React.Fragment>
  );
}

export default App;
