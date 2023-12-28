import Popup from 'reactjs-popup';
import React, { useState, useRef, useContext, useEffect } from 'react';
import './Popup.css';
import SyllabusInputForm from '../SyllabusInputForm/SyllabusInputForm';
export default ({ course, assignUserToCourse, users, assignedUsers }) => {
  const [user, setUser] = useState(null);
  const [usersOptions, setUsersOptions] = useState('');

  const handlerChangeUserSelect = (e) => {
    console.log(e.target.value);
    let data = e.target.value;
  };
  const Init = () => {
    setUsersOptions((prevState) =>
      users
        .filter((user) => !assignedUsers.includes(user._id))
        .filter((user) => user.role === 'instructor')
        .map((user, index) => {
          return (
            <option value={index} key={index}>
              {user.username}
            </option>
          );
        })
    );
  };

  const handleOnSelectedUserChange = async (event) => {
    const index = event.target.value * 1;
    const filtered_arr = users
      .filter((user) => !assignedUsers.includes(user._id))
      .filter((user) => user.role === 'instructor');
    console.log({ index, selectedUser: filtered_arr[index] });
    setUser((prevState) => filtered_arr[index]);
    return;
  };
  useEffect(() => {
    Init();
  }, [users, assignedUsers]);

  return (
    <Popup trigger={<button className="button"> Phân công </button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <select className="select-assign-user" onChange={handleOnSelectedUserChange}>
            {usersOptions}
          </select>

          <div className="actions">
            <button
              className="button-add-new"
              onClick={async () => {
                const response = await assignUserToCourse(user, course);
                if (response.success) {
                  close();
                }
              }}
            >
              Phân công
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};
