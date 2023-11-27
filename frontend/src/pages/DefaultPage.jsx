import logo from './logo.svg';
import './DefaultPage.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import SocketAPIs from './APIs/socket-apis';
import SocketContext from './contexts/socket-context';
import { convertToPDF } from './APIs/convert-pdf-apis';
import { POST_CreateNewSyllabus } from './APIs/SyllabusAPI';
var FormData = require('form-data');

const DefaultPage = () => {
  const [roomID, setRoomID] = useState('');
  const socketContext = useContext(SocketContext);

  const clickSendButton = async () => {
    console.log('pressed Send');
    const message = {
      number: 10,
      obj: { abc: 123 },
    };
    const socket = socketContext.mySocket;
    socket.emit('sendMessage', message, 'Test');
    const response = await fetch('/api/v1/syllabus/', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const clickJoinButton = () => {
    console.log('pressed Join');
    const message = {
      number: 10,
      obj: { abc: 123 },
    };
    const socket = socketContext.mySocket;
    socket.emit('joinRoom', 'Test', (message) => {
      SocketAPIs.receiveNotiMe(message);
    });
  };

  const convertPDF = () => {
    const pdfHTMLElement = document.getElementById('pdf'); // HTML element to be converted to PDF
    const convert = convertToPDF(pdfHTMLElement);
    console.log(convert);
  };

  const testAPIHandler = async () => {
    const body = { course: '6562143b0192dcfeb0902e4b' };
    const response = await POST_CreateNewSyllabus(body);
    console.log(response);
  };
  useEffect(() => {
    const socket = socketContext.mySocket;
    socket.on('receiveNotiAll', (message) => {
      SocketAPIs.receiveNotiAll(message);
    });
    socket.on('receiveNotiMe', (message) => {
      SocketAPIs.receiveNotiMe(message);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={clickSendButton}>Press</button>
        <button onClick={clickJoinButton}>Join</button>
        <button onClick={convertPDF}>toPDF</button>
        <button onClick={testAPIHandler}>testAPI</button>

        <div id="pdf">
          <h1>h1 123</h1>
          <h2>h2 123</h2>
          <h3>h3 123</h3>
        </div>
      </header>
    </div>
  );
};

export default DefaultPage;
