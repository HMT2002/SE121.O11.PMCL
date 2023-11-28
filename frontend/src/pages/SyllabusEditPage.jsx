import logo from '../logo.svg';
import './SyllabusEditPage.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import SocketAPIs from '../APIs/socket-apis';
import SocketContext from '../contexts/socket-context';
import { convertToPDF } from '../APIs/convert-pdf-apis';
import { POST_CreateNewSyllabus } from '../APIs/SyllabusAPI';
import SyllabusEditForm from '../UIComponents/Editors/SyllabusEditForm';
var FormData = require('form-data');

const SyllabusEditPage = () => {
  const testAPIHandler = async () => {
    // const body = { course: '6562143b0192dcfeb0902e4b' };
    // const response = await POST_CreateNewSyllabus(body);
    // console.log(response);
  };
  useEffect(() => {}, []);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={testAPIHandler}>testAPI</button>
        <SyllabusEditForm />
      </header>
    </div>
  );
};

export default SyllabusEditPage;
