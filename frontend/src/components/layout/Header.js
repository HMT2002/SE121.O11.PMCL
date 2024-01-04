import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IoLogInOutline, IoLogOut, IoMenu } from 'react-icons/io5';
import { RiUserAddFill } from 'react-icons/ri';

import Button from '../UI elements/Button';
import AuthContext from '../../contexts/auth-context';
import SearchBar from './SearchBar';

import '../../Styles/Header.css';
import logoimg from '../../images/logo-uit.png';
import DropdownNotification from '../Dropdown/DropdownNotification';

const Header = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    authContext.OnUserLogout();
    navigate('/');
  };

  return (
    <React.Fragment>
      <div className="app-header">
        <div className="app-header__container">
          <Button
            className="app-header__burger-menu__button"
            icon={<IoMenu className="app-header__burger-menu__button icon" />}
          />
          <Link className="app-header__logo" to="/">
            <img src={logoimg} className="logo" />
          </Link>
          <SearchBar />
          {/*Unauthorized*/}
          {!authContext.isAuthorized && (
            <React.Fragment>
              <Link className="app-header__unauthorized login" to="/login">
                <IoLogInOutline className="app-header__unauthorized__icon login" />
                Đăng nhập
              </Link>
              <Link className="app-header__unauthorized register" to="/signup">
                <RiUserAddFill className="app-header__unauthorized__icon register" />
                Đăng ký
              </Link>
            </React.Fragment>
          )}
          {/*Authorized*/}
          {authContext.isAuthorized && (
            <React.Fragment>
              <div style={{ margin: '15px' }}>
                <DropdownNotification />
              </div>
              <img
                className="app-header__authorized-avatar"
                // src="https://aniyuki.com/wp-content/uploads/2022/03/aniyuki-cute-anime-avatar-profile-picture-14.jpg"
                src={authContext.avatar}
                alt="avatar"
              />
              <Button
                className="app-header__authorized-logout"
                onClick={LogoutHandler}
                icon={<IoLogOut className="app-header__authorized-logout icon" />}
                content="Đăng xuất"
              />
            </React.Fragment>
          )}
        </div>
      </div>
      {props.children}
    </React.Fragment>
  );
};

export default Header;
