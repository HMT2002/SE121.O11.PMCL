import React, { useContext } from 'react';

import AuthContext from '../../contexts/auth-context';

import { Link } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { GiToolbox } from 'react-icons/gi';
import { RiUser3Line } from 'react-icons/ri';
import { IoBodyOutline } from 'react-icons/io5';
import { TfiAgenda } from 'react-icons/tfi';
import { FaBook } from 'react-icons/fa6';

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
          {(authContext.role === 'admin' || authContext.role === 'chairman') && (
            <React.Fragment>
              <SidebarItem
                icon={<FaBook className="app-sidebar__item__icon" />}
                content="Tạo mới môn học"
                navigateRoute={'/courses'}
              />
              <SidebarItem
                icon={<TfiAgenda className="app-sidebar__item__icon" />}
                content="Phân công phụ trách"
                navigateRoute={'/assignment'}
              />
            </React.Fragment>
          )}
          {authContext.role === 'admin' && (
            <SidebarItem
              icon={<IoBodyOutline className="app-sidebar__item__icon" />}
              content="Giao quyền"
              navigateRoute={'/authentication'}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
