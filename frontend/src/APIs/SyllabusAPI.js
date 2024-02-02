import axios from 'axios';

import { APIResponseModel } from '../Models/APIModels';
import { SyllabusModel } from '../Models/SyllabusModel';
import { useContext } from 'react';

export const GET_Syllabuses = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/v1/syllabus/',
    });

    if (response.status === 200) {
      return Array.from(response.data.data);
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.log(error);
  }

  return [];
};

export const GET_SyllabusById = async (id, token) => {
  try {
    let { data } = await axios({
      method: 'get',
      url: '/api/v1/syllabus/id/' + id,
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    if (data.expired) {
      let { data: refresh_data } = await axios({
        method: 'get',
        url: '/api/v1/syllabus/id/' + id,
        validateStatus: () => true,
        headers: {
          'Content-Type': 'application/json',
          authorization: data.token,
        },
      });
      data = refresh_data;
    }
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GET_SyllabusesByAuthor = async (authorId) => {};

export const GET_SyllabusesByCourse = async (token, courseId) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'api/v1/syllabus/course/' + courseId,
      validateStatus: () => true,
      headers: {
        authorization: token,
      },
    });

    if (data.expired) {
      let { data: refresh_data } = await axios({
        method: 'get',
        url: 'api/v1/syllabus/course/' + courseId,
        validateStatus: () => true,
        headers: {
          authorization: data.token,
        },
      });
      data = refresh_data;
    }
    return data.syllabus;
  } catch (error) {
    return error;
  }
};

export const POST_CreateNewSyllabus = async (token, body) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: '/api/v1/syllabus',
      data: body,
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    if (data.expired) {
      let { data: refresh_data } = await axios({
        method: 'post',
        url: 'api/v1/syllabus',
        data: body,
        validateStatus: () => true,
        headers: {
          'Content-Type': 'application/json',
          authorization: data.token,
        },
      });
      data = refresh_data;
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const POST_ApproveSyllabus = async (token, syllabusId) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: '/api/v1/syllabus/approve/' + syllabusId,
      data: {},
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

export const PATCH_UpdateSyllabusByCourseId = async (token, courseId, body) => {
  try {
    const { data } = await axios({
      method: 'patch',
      url: '/api/v1/syllabus/course/' + courseId,
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
export const DELETE_RemoveSyllabusById = async () => {};

const SyllabusAPI = {
  GET_Syllabuses,
  GET_SyllabusById,
  GET_SyllabusesByAuthor,
  GET_SyllabusesByCourse,
  POST_CreateNewSyllabus,
  PATCH_UpdateSyllabusByCourseId,
  DELETE_RemoveSyllabusById,
};

export default SyllabusAPI;
