import './ProgramOutcome.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { GET_SyllabusesByCourse, POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import { GET_Courses } from '../../APIs/CourseAPI';
var FormData = require('form-data');

const ProgramOutcome = (props) => {
  const check = props.programOutcome;
  const [programOutcome, setProgramOutcome] = useState(props.programOutcome);

  useEffect(() => {
    const Init = async () => {};
    Init();
  }, []);

  return (
    <React.Fragment>
      {check ? (
        <div>
          <div>programOutcome outcomeLevel: {programOutcome.outcomeLevel}</div>
          <div>programOutcome programOutcome: {programOutcome.programOutcome}</div>
          <div>programOutcome outcomeAssessment: {programOutcome.outcomeAssessment}</div>
          <div>programOutcome assessmentLevel: {programOutcome.assessmentLevel}</div>
          <div>programOutcome description: {programOutcome.description}</div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default ProgramOutcome;
