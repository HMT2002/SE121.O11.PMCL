import React from 'react';

import { useLocation } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

import '../../Styles/Layout.css';

const Layout = (props) => {
  const location = useLocation();
  const isLoginOrRegisterPage = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <React.Fragment>
      <main className="app-layout">
        <Header />
        {/* {isLoginOrRegisterPage && <Sidebar className="app-layout__sidebar" />} */}
        <div className="app-layout__page">{props.children}</div>
        {/* {isLoginOrRegisterPage && } */}
      </main>
    </React.Fragment>
  );
};

export default Layout;
