import './CourseGoal.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { GET_SyllabusesByCourse, POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import { GET_Courses } from '../../APIs/CourseAPI';
import ProgramOutcome from './ProgramOutcome';
var FormData = require('form-data');

const CourseGoal = (props) => {
  console.log(props);
  const check = props.courseGoal;
  const [goal, setGoal] = useState(props.courseGoal);

  useEffect(() => {
    const Init = async () => {};
    Init();
  }, []);

  return (
    <React.Fragment>
      {check ? (
        <div>
          <div>goal description: {goal.description}</div>
          <div>goal maxScore: {goal.maxScore}</div>
          <div>goal requirement: {goal.requirement}</div>
          <div>
            goal programOutcomes:{' '}
            {goal.programOutcomes.map((programOutcome) => {
              return <ProgramOutcome programOutcome={programOutcome} />;
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default CourseGoal;
