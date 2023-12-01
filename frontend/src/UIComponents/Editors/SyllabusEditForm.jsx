import './SyllabusEditForm.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import SocketAPIs from '../../APIs/socket-apis';
import SocketContext from '../../contexts/socket-context';
import { convertToPDF } from '../../APIs/convert-pdf-apis';
import { GET_SyllabusesByCourse, POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import { GET_Courses } from '../../APIs/CourseAPI';
import CourseOutcome from './CourseOutcome';
var FormData = require('form-data');

const SyllabusEditForm = () => {
  const [courses, setCourses] = useState([]);
  const [coursesOptions, setCoursesOptions] = useState('');
  const [syllabusByCourse, setSyllabusByCourse] = useState('');

  const [syllabusCourse, setSyllabusCourse] = useState('');
  const [syllabusCourseOutcomes, setSyllabusCourseOutcomes] = useState('');
  const [syllabusCourseAssessments, setSyllabusCourseAssessments] = useState({});
  const [syllabusCourseSchedules, setSyllabusCourseSchedules] = useState({});
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
      courseOutcomes: [
        {
          courseGoal: {
            description: '',
            maxScore: 0,
            requirement: '',
            programOutcomes: [
              {
                programOutcome: '656775078e449fefed185a89',
                outcomeLevel: 0,
                outcomeAssessment: '656775048e449fefed185a87',
                assessmentLevel: 0,
                description: '',
              },
              {
                programOutcome: '656775078e449fefed185a89',
                outcomeLevel: 1,
                outcomeAssessment: '656775048e449fefed185a87',
                assessmentLevel: 1,
                description: '',
              },
            ],
          },
          level: 0,
          description: '',
          levelOfTeaching: '65676fb2df30c40ecb69af48',
        },
      ],
      courseAssessments: [
        {
          assessElement: '65677b088cf10e78eb3b1a86',
          assessLevel: 0,
          description: '',
          courseOutcomes: ['outcome 1', 'outcome 2'],
          percentage: 50,
          rubrics: [
            {
              courseOutcome: ['outcome first', 'outcome second'],
              details: [
                {
                  level: 0,
                  requirements: [
                    {
                      academicPerformance: 'Trung bình',
                      minScore: 0,
                      maxScore: 100,
                      requirement: 'requirement detail',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      courseSchedules: [
        {
          class: 'C215',
          description: 'schedule description',
          activities: 'some activities',
          courseAssessElements: ['element 1', 'element 2'],
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                maxScore: 0,
                requirement: '',
                programOutcomes: [
                  {
                    programOutcome: '656775078e449fefed185a89',
                    outcomeLevel: 0,
                    outcomeAssessment: '656775048e449fefed185a87',
                    assessmentLevel: 0,
                    description: '',
                  },
                  {
                    programOutcome: '656775078e449fefed185a89',
                    outcomeLevel: 1,
                    outcomeAssessment: '656775048e449fefed185a87',
                    assessmentLevel: 1,
                    description: '',
                  },
                ],
              },
              level: 0,
              description: '',
              levelOfTeaching: '65676fb2df30c40ecb69af48',
            },
          ],
        },
      ],
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
  const onSyllabusCourseChangeHandler = async (event) => {
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredSyllabusCourse: event.target.value };
    // });
    console.log(event);
    setSyllabusCourse((prevState) => {
      return event.target.value;
    });
    const syllabusByCourseResponse = await GET_SyllabusesByCourse(event.target.value);
    console.log(syllabusByCourseResponse);
    let { _id, course, courseOutcomes, courseSchedules, courseAssessments } = syllabusByCourseResponse;
    try {
      courseOutcomes = courseOutcomes.map((courseOutcome) => {
        return <CourseOutcome courseOutcome={courseOutcome} />;
      });
    } catch (error) {}
    if (syllabusByCourseResponse._id !== undefined) {
      setSyllabusByCourse((prevState) => {
        return (
          <div>
            <h1>{_id}</h1>
            <h2>{course.courseNameVN}</h2>
            <div>{courseOutcomes}</div>
            {/* <div>{courseSchedules}</div>
            <div>{courseAssessments}</div> */}
          </div>
        );
      });
    }
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
      {/* <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input>
      <input type="text" onChange={onSyllabusCourseOutcomesChangeHandler} value={syllabusCourseOutcomes}></input> */}

      <select value={syllabusCourse} onChange={onSyllabusCourseChangeHandler}>
        {coursesOptions}
      </select>
      <div>{syllabusByCourse}</div>
      <input type="submit"></input>
    </form>
  );
};

export default SyllabusEditForm;
