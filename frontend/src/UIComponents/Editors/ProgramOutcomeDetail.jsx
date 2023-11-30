import './ProgramOutcomeDetail.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { GET_SyllabusesByCourse, POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import { GET_Courses } from '../../APIs/CourseAPI';
var FormData = require('form-data');

const ProgramOutcomeDetail = (props) => {
  const check = props.programOutcomeDetail;
  const [programOutcomeDetail, setProgramOutcomeDetail] = useState(props.programOutcomeDetail);

  useEffect(() => {
    const Init = async () => {};
    Init();
  }, []);

  return (
    <React.Fragment>
      {check ? (
        <div>
          <div>programOutcomeDetail outcomeLevel: {programOutcomeDetail.label}</div>
          <div>programOutcomeDetail description: {programOutcomeDetail.description}</div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default ProgramOutcomeDetail;
