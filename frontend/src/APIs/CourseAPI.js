import axios from 'axios';
export const GET_Courses = () => {};

export const GET_CourseById = () => {};

export const GET_CoursesByDepartment = (departmentId) => {};

export const POST_UpdateCourseById = async (token, id, body) => {
  try {
    const { data } = await axios({
      method: 'patch',
      url: '/api/v1/course/' + id,
      data: body,
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const POST_CreateNewCourse = async (token, body) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: '/api/v1/course/',
      data: body,
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const GET_CheckIsUserAssign = async (courseID, token, body) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: '/api/v1/course/is-user-assign/course-id/' + courseID,
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
export const DELETE_RemoveCourseById = (courseId) => {};

const CourseAPI = {
  GET_Courses,
  GET_CourseById,
  GET_CoursesByDepartment,
  POST_CreateNewCourse,
  POST_UpdateCourseById,
  DELETE_RemoveCourseById,
};

export default CourseAPI;
