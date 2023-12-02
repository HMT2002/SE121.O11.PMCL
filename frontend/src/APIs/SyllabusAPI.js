import axios from "axios";

import { APIResponseModel } from "../Models/APIModels"
import { SyllabusModel } from "../Models/SyllabusModel";

export const GET_Syllabuses = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/v1/syllabus/",
      headers: {
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2QxNWUxODliOGJlMzJhM2UxNjc1OSIsImlhdCI6MTcwMDQ5MTQxMywiZXhwIjoxNzA4MjY3NDEzfQ.VR6brJT1CI5jAnBLPcECljyM3ZWzYNebSjOtkTDw3PA",
      }
    });

    if (response.status === 200) {
      return Array.from(response.data.data);
    }
    else {
      console.log(response.error);
    }
  } catch (error) {
    console.log(error);
  }

  return [];
}

export const GET_SyllabusById = async (id) => { };

export const GET_SyllabusesByAuthor = async (authorId) => { };

export const GET_SyllabusesByCourse = async (courseId) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'api/v1/syllabus/course/' + courseId,
      validateStatus: () => true,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVmMjczODBjMjY4YmE2MjgxNGJlMyIsImlhdCI6MTcwMDcyMTI2OCwiZXhwIjoxNzA4NDk3MjY4fQ.R3bCwb1b78bicyW5aw_koTLOpUtiwPZOlkNqlb4QZ0g',
      },
    });
    return data.syllabus;
  } catch (error) {
    return error;
  }
};

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

export const POST_UpdateSyllabusById = async () => { };

export const DELETE_RemoveSyllabusById = async () => { };


const SyllabusAPI = {
  GET_Syllabuses,
  GET_SyllabusById,
  GET_SyllabusesByAuthor,
  GET_SyllabusesByCourse,

  POST_CreateNewSyllabus,
  POST_UpdateSyllabusById,

  DELETE_RemoveSyllabusById,
}

export default SyllabusAPI;
