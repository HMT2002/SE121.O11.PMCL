import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { Table, TableCell, TableContent, TableTitle } from '../Table';
import './Popup.css';

export default ({ course, assignUserToCourse, users, assignedUsers }) => {
  const [user, setUser] = useState(null);
  const [usersOptions, setUsersOptions] = useState('');

  const handlerChangeUserSelect = (e) => {
    console.log(e.target.value);
    let data = e.target.value;
  };

  const Init = () => {
    const filtered_arr = users
      .filter((user) => !assignedUsers.includes(user._id))
      .filter((user) => user.role === 'instructor');

    setUsersOptions((prevState) =>
      filtered_arr.map((user, index) => {
        return (
          <option value={index} key={index}>
            {user.username}
          </option>
        );
      })
    );

    setUser((prevState) => filtered_arr[0]);
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

          <div className="w-50">
            <select className="select-assign-user form-control" onChange={handleOnSelectedUserChange}>
              {usersOptions}
            </select>
          </div>

          <div className="mt-2">
            {user ? (
              <Table>
                <TableTitle title={`Thông Tin Chi tiết người dùng`} />
                <TableContent>
                  <TableCell label={`Tên người dùng`} value={user.username} isBold={true} />
                  <TableCell label={`khoa`} value={user.department.name} isBold={true} />
                  <TableCell label={`Bằng`} value={user.degree} />
                </TableContent>
              </Table>
            ) : null}
          </div>

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
