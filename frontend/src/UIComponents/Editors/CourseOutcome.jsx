import './CourseOutcome.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { GET_SyllabusesByCourse, POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import { GET_Courses } from '../../APIs/CourseAPI';
import CourseGoal from './CourseGoal';
var FormData = require('form-data');

const CourseOutcome = (props) => {
  const [outcome, setOutcome] = useState(props.courseOutcome);
  const [courseGoals, setCourseGoals] = useState('');

  useEffect(() => {
    const Init = async () => {};
    Init();
  }, []);

  return (
    <div>
      <div>outCome level: {outcome.level}</div>
      <div>outCome description: {outcome.description}</div>
      <div>outCome levelOfTeaching: {outcome.levelOfTeaching}</div>
      <div>
        outCome Goal: <CourseGoal courseGoal={outcome.courseGoal} />
      </div>
    </div>
  );
};

export default CourseOutcome;
