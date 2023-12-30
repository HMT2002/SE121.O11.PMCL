import React, { useState, useEffect, useContext, useCallback } from 'react';
import './AuthenticationPage.css';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth-context';
import { Toaster, toast } from 'sonner';

function AuthenticationPage() {
  const [registerTopics, setRegisterTopics] = useState(null);
  const [users, setUsers] = useState(null);

  const authCtx = useContext(AuthContext);

  const confirmChangeRoleHandler = (user, role) => {
    console.log(user);
    console.log(role);
    if (user.role === role) {
      toast.error('KHông thay đổi', {
        duration: 2000,
      });
      return;
    }
    const id = user._id;

    axios
      .post(
        'api/v1/users/change-role/id/' + id,
        {
          role: role,
        },
        {
          headers: {
            authorization: authCtx.token,
            'Content-Type': 'application/json',
          },
          validateStatus: () => true,
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          console.log('Successfully update!');
          toast.success('Cập nhật thành công', {
            duration: 2000,
          });
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu cần
        console.error('Error confirming topic:', error);
        toast.error('Lỗi không thể cập nhật quyền', {
          duration: 2000,
        });
      });
  };
  const deleteHandler = (user) => {
    const id = user._id;
    axios
      .delete('api/v1/users/id/' + id, {
        headers: {
          authorization: authCtx.token,
        },
        validateStatus: () => true,
      })
      .then((res) => {
        // // Sau khi xác nhận thành công, cập nhật registerTopics bằng cách loại bỏ change_topic
        // const updatedTopics = registerTopics.filter((topic) => topic.ma_sv._id !== ma_sv);
        // setRegisterTopics(updatedTopics);
        const updatedUser = users.filter((user) => user._id !== id);
        setUsers(updatedUser);
        console.log('Successfully delete!');
        toast.success('Xóa người dùng thành công', {
          duration: 2000,
        });
      })
      .catch((error) => {
        // Xử lý lỗi nếu cần
        console.error('Error confirming topic:', error);
        toast.error('Lỗi không thể xóa người dùng', {
          duration: 2000,
        });
      });
  };
  const changePermissionHandler = () => {};

  const handleOnRoleOptionChange = useCallback(async (event, user) => {
    console.log(event.target.value);
    console.log('UUUUUUUUUUUUUUUUUUUUUUUU');
    console.log(user);

    return;
  }, []);

  const fetchData = async () => {
    console.log(authCtx.token);
    const { data } = await axios.get('/api/v1/users', {
      headers: {
        authorization: authCtx.token,
      },
      validateStatus: () => true,
    });
    setUsers(data.data);
    console.log(data);
  };

  useEffect(() => {
    // axios.get('registerTopic/getAllRegisterTopicByStatus').then((res) => {
    //   setRegisterTopics(res.data);
    //   console.log(res.data);
    // });
    fetchData();
  }, [authCtx]);
  return (
    <React.Fragment>
      <Toaster />
      <div className="change-topic-management">
        <h1>Danh người dùng</h1>
        <table className="change-topic-table">
          <thead>
            <tr>
              <th>ID người dùng</th>
              <th>Tên người dùng</th>
              <th>Vai trò</th>
              <th>Khoa</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user, index) => {
                var currentRole = user.role;
                return (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td style={{ width: '300px' }}>{user.username}</td>
                    <td>
                      {user.role === 'admin' ? (
                        <p>admin</p>
                      ) : (
                        <select
                          onChange={(event) => {
                            handleOnRoleOptionChange(event, user);
                            currentRole = event.target.value;
                          }}
                        >
                          {user.role === 'chairman' ? (
                            <React.Fragment>
                              <option value="chairman">Trưởng khoa</option>
                              <option value="instructor">Giảng viên</option>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <option value="instructor">Giảng viên</option>
                              <option value="chairman">Trưởng khoa</option>
                            </React.Fragment>
                          )}
                        </select>
                      )}
                    </td>
                    <td>{user.department ? user.department.name : ''}</td>
                    <td>
                      {user.role === 'admin' ? null : (
                        <div className="div-button">
                          <button
                            className="confirm-button"
                            onClick={() => confirmChangeRoleHandler(user, currentRole)}
                          >
                            Xác nhận
                          </button>
                          <button className="delete-button" onClick={() => deleteHandler(user)}>
                            Xóa
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <Loading />
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default AuthenticationPage;
