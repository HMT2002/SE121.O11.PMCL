import axios from 'axios';
export const GET_Syllabuses = async () => {};

export const GET_SyllabusById = async (id) => {};

export const GET_SyllabusesByAuthor = async (authorId) => {};

export const GET_SyllabusesByCourse = async (courseId) => {};

export const POST_CreateNewSyllabus = async (body) => {
  try {
    console.log(body);
    const { data } = await axios({
      method: 'post',
      url: 'api/v1/syllabus',
      data: body,
      validateStatus: () => true,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVmMjczODBjMjY4YmE2MjgxNGJlMyIsImlhdCI6MTcwMDcyMTI2OCwiZXhwIjoxNzA4NDk3MjY4fQ.R3bCwb1b78bicyW5aw_koTLOpUtiwPZOlkNqlb4QZ0g',
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const POST_UpdateSyllabusById = async () => {};

export const DELETE_RemoveSyllabusById = async () => {};
const SyllabusAPI = {
  GET_Syllabuses,
  GET_SyllabusById,
  GET_SyllabusesByAuthor,
  GET_SyllabusesByCourse,

  POST_CreateNewSyllabus,
  POST_UpdateSyllabusById,

  DELETE_RemoveSyllabusById,
};

export default SyllabusAPI;
