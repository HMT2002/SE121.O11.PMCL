import './DefaultPage.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Card from '../../components/Card/Card';

import SocketAPIs from '../../APIs/socket-apis';
import SocketContext from '../../contexts/socket-context';
import { convertToPDF } from '../../APIs/convert-pdf-apis';
import { POST_CreateNewSyllabus } from '../../APIs/SyllabusAPI';
import ErrorEnum from '../../constants/ErrorEnum';
import axios from 'axios';
var FormData = require('form-data');

const DefaultPage = () => {
  // const [roomID, setRoomID] = useState('');
  // const socketContext = useContext(SocketContext);
  // const clickSendButton = async () => {
  //   console.log('pressed Send');
  //   const message = {
  //     number: 10,
  //     obj: { abc: 123 },
  //   };
  //   const socket = socketContext.mySocket;
  //   socket.emit('sendMessage', message, 'Test');
  //   const response = await fetch('/api/v1/syllabus/', {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  // const clickJoinButton = () => {
  //   console.log('pressed Join');
  //   const message = {
  //     number: 10,
  //     obj: { abc: 123 },
  //   };
  //   const socket = socketContext.mySocket;
  //   socket.emit('joinRoom', 'Test', (message) => {
  //     SocketAPIs.receiveNotiMe(message);
  //   });
  // };
  // useEffect(() => {
  //   const socket = socketContext.mySocket;
  //   socket.on('receiveNotiAll', (message) => {
  //     SocketAPIs.receiveNotiAll(message);
  //   });
  //   socket.on('receiveNotiMe', (message) => {
  //     SocketAPIs.receiveNotiMe(message);
  //   });
  // }, []);

  const [historyList, setHistoryList] = useState([]);

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
    axios.get('http://localhost:7000/api/v1/syllabus').then((res) => {
      console.log(res.data);
      setHistoryList(res.data.data);
    });
  }, []);

  return (
    <div className="home-section">
      <div id="home-container">
        {historyList.map((historyItem, key) => {
          // return historyItem.syllabuses.map((syllabusItem, key) => {
          //   return (
          //     <Card
          //       syllabus={syllabusItem}
          //       course={historyItem.course}
          //       cardtype="pet"
          //       key={key}
          //       id={syllabusItem._id}
          //     />
          //   );
          // });

          return historyItem.syllabuses.length > 0 ? (
            <Card
              syllabus={historyItem.syllabuses[historyItem.syllabuses.length - 1]}
              course={historyItem.course}
              cardtype="pet"
              key={key}
              id={historyItem.course._id}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default DefaultPage;
