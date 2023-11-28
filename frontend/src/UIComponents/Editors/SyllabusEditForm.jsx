import './SyllabusEditForm.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import SocketAPIs from '../../APIs/socket-apis';
import SocketContext from '../../contexts/socket-context';
import { convertToPDF } from '../../APIs/convert-pdf-apis';
import { POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import { GET_Courses } from '../../APIs/CourseAPI';
var FormData = require('form-data');

const SyllabusEditForm = () => {
  const [courses, setCourses] = useState([]);
  const [coursesOptions, setCoursesOptions] = useState('<div></div>');

  const [syllabusCourse, setSyllabusCourse] = useState('');
  const [syllabusCourseOutcomes, setSyllabusCourseOutcomes] = useState('');
  const [syllabusCourseAssessments, setSyllabusCourseAssessments] = useState({});
  const [syllabuCourseSchedules, setSyllabusCourseSchedules] = useState({});
  const [userInput, setUserInput] = useState({
    enteredSyllabusCourse: '',
    enteredSyllabusCourseOutcomes: {},
    enteredSyllabusCourseAssessments: {},
    enteredSyllabuCourseSchedules: {},
  });

  const testAPIHandler = async () => {
    // const body = { course: '6562143b0192dcfeb0902e4b' };
    // const response = await POST_CreateNewSyllabus(body);
    // console.log(response);
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    console.log(syllabusCourse);
    const body = {
      course: syllabusCourse,
      courseOutcomes: syllabusCourseOutcomes,
      courseAssessments: syllabusCourseAssessments,
      courseSchedules: syllabuCourseSchedules,
    };
    const response = await POST_CreateNewSyllabus(body);
    console.log(response);

    setSyllabusCourse((prevState) => {
      return '';
    });
    setSyllabusCourseOutcomes((prevState) => {
      return '';
    });

    setSyllabusCourseAssessments((prevState) => {
      return '';
    });

    setSyllabusCourseSchedules((prevState) => {
      return '';
    });
  };
  const onSyllabusCourseChangeHandler = (event) => {
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredSyllabusCourse: event.target.value };
    // });
    console.log(event);
    setSyllabusCourse((prevState) => {
      return event.target.value;
    });
    console.log(syllabusCourse);
  };
  const onSyllabusCourseOutcomesChangeHandler = (event) => {
    setSyllabusCourseOutcomes((prevState) => {
      return event.target.value;
    });
  };
  useEffect(() => {
    const Init = async () => {
      const response = await GET_Courses();
      console.log(response);
      setCourses((prevState) => {
        return response.courses;
      });
      const response_courses = response.courses;
      setCoursesOptions((prevState) => {
        return response_courses.map((course) => {
          return <option value={course._id}>{course._id}</option>;
        });
      });
    };
    Init();
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <select value={syllabusCourse} onChange={onSyllabusCourseChangeHandler}>
        {coursesOptions}
      </select>
      <input type="submit"></input>
    </form>
  );
};

export default SyllabusEditForm;
