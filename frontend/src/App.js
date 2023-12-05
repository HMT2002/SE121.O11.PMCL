import React from 'react';

import AppRouter from './Utils/AppRouter.js';
import AppLayout from './UIComponents/Commons/Layout.js'

import './App.css';
import "./Styles/Pages.css";

function App() {
  return (
    <React.Fragment>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </React.Fragment>
  );
}

export default App;
