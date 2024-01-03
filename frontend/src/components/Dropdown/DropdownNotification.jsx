import './DropdownNotification.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { IoIosNotificationsOutline } from 'react-icons/io';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import NotifyItem from '../NotifyItem/NotifyItem';

const DropdownNotification = (props) => {
  const authCtx = useContext(AuthContext);
  const [notifying, setNotifying] = useState(false);
  const [notifies, setNotifies] = useState([]);

  const getUserNotifies = () => {
    axios
      .get('/api/v1/notification/?page=1&limit=5', {
        headers: {
          authorization: authCtx.token,
          // 'Content-Type': 'application/json',
        },
        validateStatus: () => true,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setNotifies((prevState) => {
            return res.data.data;
          });
          const arrNotifyID = res.data.data.map((notify) => {
            return notify._id;
          });

          axios.post(
            '/api/v1/notification/set-seen',
            { arrNotifies: arrNotifyID },
            {
              headers: {
                authorization: authCtx.token,
                'Content-Type': 'application/json',
              },
              validateStatus: () => true,
            }
          );
        }
      });
  };

  useEffect(() => {
    axios
      .get('/api/v1/notification/', {
        headers: {
          authorization: authCtx.token,
          // 'Content-Type': 'application/json',
        },
        validateStatus: () => true,
      })
      .then((res) => {
        if (res.data.status === 200) {
          var result = res.data.data.filter((notify) => {
            return notify.isViewed === false;
          });
          console.log(result);
          if (result.length > 0) {
            setNotifying((prevState) => {
              return true;
            });
          }
        }
      });
  }, []);

  return (
    <Dropdown
      onOpenChange={(event) => {
        console.log('onChange');
        getUserNotifies();
      }}
    >
      <MenuButton
        className={`dropdown-main-${notifying ? 'not-checked' : 'checked'}`}
        onClick={() => {
          setNotifying((prevState) => {
            return false;
          });
        }}
      >
        <IoIosNotificationsOutline />
      </MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {notifies.length > 0
          ? notifies.map((notify, index) => {
              return (
                <MenuItem
                  onClick={() => {
                    console.log('logout');
                  }}
                >
                  <NotifyItem notify={notify} />
                </MenuItem>
              );
            })
          : null}
      </Menu>
    </Dropdown>
  );
};

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'};
  z-index: 1;
  `
);

export default DropdownNotification;
