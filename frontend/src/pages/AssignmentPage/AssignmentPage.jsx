import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import './AssignmentPage.css';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth-context';
import PopupAssignUser from '../../components/Popup/PopupAssignUser';
import { Toaster, toast } from 'sonner';

function AssignmentPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesOptions, setCoursesOptions] = useState('');
  const [seletedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const [course, setCourse] = useState([]);
  const [users, setUsers] = useState([]);
  const [courseUsers, setCourseUsers] = useState(null);

  const authCtx = useContext(AuthContext);

  const getDataAssignUserToCourse = (courseID, user) => {
    axios
      .post(
        'api/v1/course/assign/course-id/' + courseID,
        {
          course: course,
          user: user._id,
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
          setCourseUsers((prevState) => [...prevState, user]);
          toast.success('Phân công thành công', {
            duration: 2000,
          });
        }
      })
      .catch((error) => {
        console.error('Error confirming topic:', error);
        toast.error('Không thể phân công', {
          duration: 2000,
        });
      });
  };

  const assignUserToCourse = (user, course) => {
    console.log(user);
    console.log(course);
    const courseID = course._id;

    getDataAssignUserToCourse(courseID, user);

    return { success: true };
  };

  const dissmissFromCourse = (user, index) => {
    const id = user._id;
    const courseID = course._id;
    axios
      .post(
        'api/v1/course/resign/course-id/' + courseID,
        {
          course: course,
          user: user._id,
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
        console.log(res);
        const updatedUser = courseUsers.filter((user) => user._id !== id).filter((user) => user.role === 'instructor');
        setCourseUsers(updatedUser);
        console.log('Successfully delete!');
      })
      .catch((error) => {
        console.error('Error confirming topic:', error);
      });
  };

  const handleOnSelectedCourseChange = async (event) => {
    const index = event.target.value * 1;
    console.log(assignments);
    setCourse((prevState) => assignments[index].course);
    setCourseUsers((prevState) => assignments[index].users);
    console.log({ index, selectedCourse: assignments[index].course, courseUsers: assignments[index].users });

    return;
  };

  const Init = () => {
    if (!authCtx.token) {
      return;
    }
    axios
      .get('/api/v1/course/assign', {
        headers: {
          authorization: authCtx.token,
        },
        validateStatus: () => true,
      })
      .then((res) => {
        const assignments = res.data;
        setAssignments((prevState) => assignments.data);
        setCoursesOptions((prevState) =>
          assignments.data.map((assignment, index) => {
            return (
              <option value={index} key={index}>
                {assignment.course.courseNameVN}
              </option>
            );
          })
        );
        setCourse((prevState) => assignments.data[0].course);
        setCourseUsers((prevState) => assignments.data[0].users);
      });

    axios
      .get('/api/v1/users', {
        headers: {
          authorization: authCtx.token,
        },
        validateStatus: () => true,
      })
      .then((res) => {
        const users = res.data;
        setUsers(users.data);
      });
  };

  useEffect(() => {
    Init();
  }, [authCtx]);

  const usersAssign = useMemo(() => {
    if (!users?.length) return;

    const courseUsersMap = courseUsers?.map((user) => user._id) || [];

    return users.filter((user) => !courseUsersMap.includes(user._id)).filter((user) => user.role === 'instructor');
  }, [users, courseUsers]);

  return (
    <div className="change-topic-management">
      <h1>Danh người dùng</h1>

      <div className="w-50">
        <select onChange={handleOnSelectedCourseChange} className="form-control">
          {coursesOptions}
        </select>
      </div>

      <table className="change-topic-table mt-2 mb-2">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Vai trò</th>
            <th>Khoa</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {courseUsers ? (
            courseUsers
              .filter((user) => user.role === 'instructor')
              .map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ width: '300px' }}>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.department ? user.department.name : ''}</td>
                    <td>
                      {user.role === 'admin' ? null : (
                        <div className="div-button">
                          <button className="delete-button" onClick={() => dissmissFromCourse(user, index)}>
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

      {usersAssign?.length ? (
        <>
          <h4>Danh sách người dùng đang đợi phân công</h4>

          <table className="change-topic-table mt-2 mb-2">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên người dùng</th>
                <th>Bằng</th>
                <th>Khoa</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {usersAssign
                .filter((user) => user.role === 'instructor')
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ width: '300px' }}>{user.username}</td>
                      <td>{user.degree}</td>
                      <td>{user.department ? user.department.name : ''}</td>
                      <td>
                        {user.role === 'admin' ? null : (
                          <div className="div-button">
                            <button className="button-add-new" onClick={() => assignUserToCourse(user, course)}>
                              Phân công
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : null}

      <PopupAssignUser
        course={course}
        assignUserToCourse={assignUserToCourse}
        users={users}
        assignedUsers={courseUsers !== null ? courseUsers.map((courseUser) => courseUser._id) : []}
      />
    </div>
  );
}

export default AssignmentPage;
