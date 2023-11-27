import logo from './logo.svg';
import './SyllabusEditPage.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import SocketAPIs from './APIs/socket-apis';
import SocketContext from './contexts/socket-context';
import { convertToPDF } from './APIs/convert-pdf-apis';
import { POST_CreateNewSyllabus } from './APIs/SyllabusAPI';
var FormData = require('form-data');

const SyllabusEditPage = () => {
  const [syllabusCourse, setSyllabusCourse] = useState('');
  const [syllabusCourseOutcomes, setSyllabusCourseOutcomes] = useState({});
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

    const body = {
      course: syllabusCourse,
      courseOutcomes: syllabusCourseOutcomes,
      courseAssessments: syllabusCourseAssessments,
      courseSchedules: syllabuCourseSchedules,
    };
    const response = await POST_CreateNewSyllabus(body);
    console.log(response);
  };
  const onSyllabusCourseChangeHandler = (event) => {
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredSyllabusCourse: event.target.value };
    // });
  };
  useEffect(() => {}, []);
  return (
    <div className="App">
      <header className="App-header"></header>
      <button onClick={testAPIHandler}>testAPI</button>
      {/* <button onClick={submitHandler}>Submit Form</button> */}
      <form onSubmit={submitHandler}>
        <input type="text" onChange={onSyllabusCourseChangeHandler}></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default SyllabusEditPage;
