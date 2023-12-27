import React, { useState, useEffect, useContext } from 'react';
import './AuthenticationPage.css';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth-context';

function AuthenticationPage() {
  const [registerTopics, setRegisterTopics] = useState(null);
  const [users, setUsers] = useState(null);

  const authCtx = useContext(AuthContext);

  const confirmHandler = (ma_sv) => {
    axios
      .put('registerTopic/facultyConfirmChangeTopic/' + ma_sv)
      .then(() => {
        // Sau khi xác nhận thành công, cập nhật registerTopics bằng cách loại bỏ change_topic
        const updatedTopics = registerTopics.filter((topic) => topic.ma_sv._id !== ma_sv);
        setRegisterTopics(updatedTopics);
      })
      .catch((error) => {
        // Xử lý lỗi nếu cần
        console.error('Error confirming topic:', error);
      });
  };
  const deleteHandler = (userId) => {
    axios
      .delete('api/v1/users/id/' + userId, {
        headers: {
          authorization: authCtx.token,
        },
        validateStatus: () => true,
      })
      .then((res) => {
        // // Sau khi xác nhận thành công, cập nhật registerTopics bằng cách loại bỏ change_topic
        // const updatedTopics = registerTopics.filter((topic) => topic.ma_sv._id !== ma_sv);
        // setRegisterTopics(updatedTopics);
        const updatedUser = users.filter((user) => user._id !== userId);
        setUsers(updatedUser);
        console.log('Successfully delete!');
      })
      .catch((error) => {
        // Xử lý lỗi nếu cần
        console.error('Error confirming topic:', error);
      });
  };
  const changePermissionHandler = () => {};

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
    <div className="change-topic-management">
      <h1>Danh sách yêu cầu đổi đề tài</h1>
      <table className="change-topic-table">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Tên người dùng</th>
            <th>Vai trò</th>
            <th>Khoa</th>
            <th>Thao tác</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.department ? user.department.name : ''}</td>
                <td>
                  <button className="confirm-button" onClick={() => confirmHandler(user._id)}>
                    Xác nhận
                  </button>
                </td>
                <td>
                  <button className="confirm-button" onClick={() => deleteHandler(user._id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <Loading />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AuthenticationPage;
