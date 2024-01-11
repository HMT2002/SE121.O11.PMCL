import React, { useContext, useEffect, useState } from 'react';
import { GETUserInfoAction, GETUserInfoTokenAction } from '../APIs/user-apis';

const AuthContext = React.createContext({
  isAuthorized: false,
  username: '',
  avatar: '',
  displayName: '',
  token: '',
  refresh: '',

  role: '',
  department: { name: '' },
  isStayLoggedIn: false,
  OnUserLogin: (username, avatar, displayName, token, role, department, isStayLoggedIn) => {},
  OnUserLogout: () => {},
  OnAvatarUpdate: (newAvatar) => {},
  OnDisplayNameUpdate: (newDisplayName) => {},
});

export const AuthContextProvider = (props) => {
  const localUsername = localStorage.getItem('username');
  const localToken = localStorage.getItem('token');
  const localRefresh = localStorage.getItem('refresh');

  const [isAuthorized, setIsAuthorized] = useState(localToken !== null ? true : false);
  const [isStayLoggedIn, setIsStayLoggedIn] = useState(null);
  const [username, setUsername] = useState(localUsername !== null ? localUsername : null);
  const [avatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [token, setToken] = useState(localToken !== null ? localToken : null);
  const [refresh, setRefresh] = useState(localRefresh !== null ? localRefresh : null);

  const [role, setRole] = useState(null);

  const [department, setDepartment] = useState(null);

  const UserLoginHandler = (username, avatar, displayName, token, refresh, role, department, isStayLoggedIn) => {
    setIsAuthorized(true);
    setUsername(username);
    setAvatar(avatar);
    setDisplayName(displayName);
    setToken('Bearer ' + token);
    setRefresh('Bearer ' + refresh);
    setRole(role);
    setDepartment(department);
    setIsStayLoggedIn(isStayLoggedIn);
  };

  const UserLogOutHandler = () => {
    setIsAuthorized(false);
    setIsStayLoggedIn(false);
    setUsername(null);
    setAvatar(null);
    setDisplayName(null);
    setToken(null);
    setRefresh(null);
    setRole(null);
    setDepartment(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  };

  const AvatarUpdateHandler = (newAvatar) => {
    setAvatar(newAvatar);
  };

  const DisplayNameUpdateHandler = (newDisplayName) => {
    setDisplayName(newDisplayName);
  };

  useEffect(() => {
    const RetrieveUserInfoHandler = async (token, refresh) => {
      try {
        const response = await GETUserInfoTokenAction(token, refresh);
        console.log(response);

        if (response.status === 400 && response.message == 'Refresh token is expired, please login again') {
          console.log('PPPPPPPPPPPPPPP');
          setIsAuthorized(false);
          setIsStayLoggedIn(false);
          setUsername(null);
          setToken(null);
          setAvatar(null);
          setDisplayName(null);
          setRole(null);
          setDepartment(null);
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          return;
        }

        if (response.status === 200) {
          const userInfo = response.data;
          if (userInfo != null) {
            setAvatar(userInfo.photo.link);
            setDisplayName(userInfo.username);
            setRole(userInfo.role);
            setDepartment(userInfo.department);
          }
        } else {
          console.log('Failed to retrieve user info!');
        }
      } catch (error) {
        console.log('Can not retrieve user info. Error: ' + error);
      }
    };

    if (localUsername != null && localToken != null && localRefresh != null) {
      console.log('EEEEEEEEEEEEEEEEE');
      setIsAuthorized(true);
      setIsStayLoggedIn(true);
      setUsername(localUsername);
      setToken(localToken);
      setRefresh(localRefresh);
      RetrieveUserInfoHandler(localToken, localRefresh);
    }
  }, []);

  useEffect(() => {
    // if (isStayLoggedIn) {
    // }
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('refresh', refresh);
  }, [isStayLoggedIn, username, token, refresh]);

  // console.log("is authorized: " + isAuthorized);
  // console.log("local username: " + username);
  // console.log("local avatar: " + avatar);
  // console.log("local display name: " + displayName);
  // console.log("local token: " + token);
  // console.log("local role: " + role);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized: isAuthorized,
        username: username,
        avatar: avatar,
        displayName: displayName,
        token: token,
        refresh: refresh,
        role: role,
        department: department,
        isStayLoggedIn: isStayLoggedIn,
        OnUserLogin: UserLoginHandler,
        OnUserLogout: UserLogOutHandler,
        OnAvatarUpdate: AvatarUpdateHandler,
        OnDisplayNameUpdate: DisplayNameUpdateHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => {
  return useContext(AuthContext);
};
