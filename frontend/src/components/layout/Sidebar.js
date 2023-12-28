import React, { useContext } from 'react';

import AuthContext from '../../contexts/auth-context';

import { Link } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { GiToolbox } from 'react-icons/gi';
import { RiUser3Line } from 'react-icons/ri';
import { IoBodyOutline } from 'react-icons/io5';
import { TfiAgenda } from 'react-icons/tfi';

import '../../Styles/Sidebar.css';

const SidebarItem = (props) => {
  return (
    <React.Fragment>
      <Link className="app-sidebar__item" to={props.navigateRoute}>
        {props.icon}
        <div>{props.content}</div>
      </Link>
    </React.Fragment>
  );
};

const Sidebar = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <React.Fragment>
      <div className={props.className}>
        <div className="app-sidebar__content">
          <SidebarItem icon={<GoHome className="app-sidebar__item__icon" />} content="Home" navigateRoute={'/'} />

          {authContext.isAuthorized && (
            <SidebarItem
              icon={<RiUser3Line className="app-sidebar__item__icon" />}
              content="Tài khoản"
              navigateRoute={'/account'}
            />
          )}
          {authContext.role === 'admin' && (
            <SidebarItem
              icon={<IoBodyOutline className="app-sidebar__item__icon" />}
              content="Authentication"
              navigateRoute={'/authentication'}
            />
          )}
          {(authContext.role === 'admin' || authContext.role === 'chairman') && (
            <SidebarItem
              icon={<TfiAgenda className="app-sidebar__item__icon" />}
              content="Assignment"
              navigateRoute={'/assignment'}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
