// import logo from './logo.svg';
import './App.css';

import AppRouter from './Utils/AppRouter.js';
import AppLayout from './UIComponents/Commons/Layout.js'

import "./Styles/Pages.css";

function App() {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}

export default App;
