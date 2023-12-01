import { APIResponseModel } from "../Models/APIModels"
import { SyllabusModel } from "../Models/SyllabusModel";

export const GET_Syllabuses = async () => {
    try {
        const response = await fetch("/api/v1/syllabus", {
            method: "GET",
            mode: "cors",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2QxNWUxODliOGJlMzJhM2UxNjc1OSIsImlhdCI6MTcwMDQ5MTQxMywiZXhwIjoxNzA4MjY3NDEzfQ.VR6brJT1CI5jAnBLPcECljyM3ZWzYNebSjOtkTDw3PA",
            }
        });

        const res = await response.json();

        const syllabusses = res.syllabusses.map((syllabus) => SyllabusModel.from(syllabus));

        return new APIResponseModel(res.status, syllabusses, "", "");

    } catch (error) {
        return new APIResponseModel(400, null, error, "");
    }
}

export const GET_SyllabusById = async (id) => {

}

export const GET_SyllabusesByAuthor = async (authorId) => {

}

export const GET_SyllabusesByCourse = async (courseId) => {

}

export const POST_CreateNewSyllabus = async () => {

}

export const POST_UpdateSyllabusById = async () => {

}

export const DELETE_RemoveSyllabusById = async () => {

}

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