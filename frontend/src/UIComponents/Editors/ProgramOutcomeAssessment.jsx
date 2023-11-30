import './ProgramOutcomeAssessment.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { GET_SyllabusesByCourse, POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import { GET_Courses } from '../../APIs/CourseAPI';
var FormData = require('form-data');

const ProgramOutcomeAssessment = (props) => {
  const check = props.programOutcomeAssessment;
  const [programOutcomeAssessment, setProgramOutcomeAssessment] = useState(props.programOutcomeAssessment);

  useEffect(() => {
    const Init = async () => {};
    Init();
  }, []);

  return (
    <React.Fragment>
      {check ? (
        <div>
          <div>programOutcomeAssessment outcomeLevel: {programOutcomeAssessment.label}</div>
          <div>
            programOutcomeAssessment description:{' '}
            {programOutcomeAssessment.levels.map((level) => {
              return (
                <div>
                  <div>level: {level.level}</div>
                  <div>description: {level.description}</div>
                </div>
              );
            })}
          </div>
          {}
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default ProgramOutcomeAssessment;
