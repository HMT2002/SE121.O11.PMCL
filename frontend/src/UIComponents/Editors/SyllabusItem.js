import React from 'react';

import Card from '../Commons/Card.js';

import { Link } from 'react-router-dom';

import '../../Styles/Syllabus.css';
import ErrorEnum from '../../constants/ErrorEnum.js';

const SyllabusItem = (props) => {
  const error = ErrorEnum.ERROR_NOT_ALLOW;
  console.log(error);
  return (
    <React.Fragment>
      <Link to={`/syllabus/${'sdfsdfds'}`}>
        <Card className="syllabus-item card-0">
          <div>Course Name</div>
          <div>Creator</div>
          <div>Status</div>
          <div>Created Date</div>
          <div>Modified Date</div>
        </Card>
      </Link>
    </React.Fragment>
  );
};

export default SyllabusItem;
