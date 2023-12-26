import React from 'react';

import Header from './Header';

import '../../Styles/Layout.css';

const Layout = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Layout;
