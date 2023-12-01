import axios from 'axios';
export const GET_Courses = async () => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'api/v1/course',
      validateStatus: () => true,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVmMjczODBjMjY4YmE2MjgxNGJlMyIsImlhdCI6MTcwMDcyMTI2OCwiZXhwIjoxNzA4NDk3MjY4fQ.R3bCwb1b78bicyW5aw_koTLOpUtiwPZOlkNqlb4QZ0g',
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const GET_CourseById = () => {};

export const GET_CoursesByDepartment = (departmentId) => {};
const CourseAPI = {};
export default CourseAPI;
