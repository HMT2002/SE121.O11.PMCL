import axios from 'axios';
export const GET_Courses = () => {};

export const GET_CourseById = () => {};

export const GET_CoursesByDepartment = (departmentId) => {};

export const POST_CreateNewCourse = () => {};

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
