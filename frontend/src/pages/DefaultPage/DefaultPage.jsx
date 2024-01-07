import './DefaultPage.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Card from '../../components/Card/Card';

import SocketAPIs from '../../APIs/socket-apis';
import SocketContext from '../../contexts/socket-context';
import { Link } from 'react-router-dom';

import ErrorEnum from '../../constants/ErrorEnum';
import Loading from '../../components/Loading/Loading';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import InfoIcon from '@mui/icons-material/Info';

import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
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
  const [pages, setPages] = useState(0);

  const authCtx = useContext(AuthContext);
  const handleInfoClick = async () => {};
  const handleNewClick = async () => {};

  useEffect(() => {
    axios.get('http://localhost:7000/api/v1/syllabus').then((res) => {
      console.log(res.data);
      setHistoryList(res.data.data);
    });
  }, []);

  return (
    <div className="home-section">
      <div id="home-container">
        <div className="account-table-container">
          <h1>Danh sách môn học</h1>
          <div className="button-container">
            <div>
              <button className="add-account-button">
                <Link id="link" to={'/new'}>
                  <FiberNewIcon />
                </Link>
              </button>
            </div>
          </div>
          <table className="account-table">
            <thead>
              <tr>
                <th>Môn</th>
                <th>Người thay đổi gần nhất</th>
                <th>Ngày sửa đổi gần nhất</th>
                <th>Trạng thái xét duyệt</th>
                <th>Người xét duyệt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {historyList.length > 0 ? (
                historyList.map((historyItem, index) => {
                  if (historyItem.syllabuses.length === 0) {
                    return (
                      <tr key={index}>
                        <td>{historyItem.course.courseNameVN}</td>
                        <td>{'NaN'}</td>
                        <td>{'NaN'}</td>
                        <td>{'NaN'}</td>
                        <td>{'NaN'}</td>
                        <td>
                          {authCtx.role === 'admin' || authCtx.role === 'chairman' ? (
                            <button onClick={() => {}}>
                              <Link id="link" to={'/course/' + historyItem.course._id}>
                                <EditIcon />
                              </Link>
                            </button>
                          ) : (
                            <button onClick={() => {}}>
                              <Link id="link" to={'/course/' + historyItem.course._id}>
                                <InfoIcon />
                              </Link>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  }
                  const updatedDate = new Date(historyItem.syllabuses[historyItem.syllabuses.length - 1].updatedDate);
                  const str =
                    updatedDate.getUTCFullYear() +
                    '/' +
                    (updatedDate.getUTCMonth() + 1) +
                    '/' +
                    updatedDate.getUTCDate() +
                    ' ' +
                    updatedDate.getUTCHours() +
                    ':' +
                    updatedDate.getUTCMinutes();

                  return (
                    <tr key={index}>
                      <td>{historyItem.course.courseNameVN}</td>
                      <td>
                        {historyItem.syllabuses[historyItem.syllabuses.length - 1].author !== undefined
                          ? historyItem.syllabuses[historyItem.syllabuses.length - 1].author.username
                          : 'NaN'}
                      </td>
                      <td>{str}</td>

                      <td>{historyItem.syllabuses[historyItem.syllabuses.length - 1].status}</td>
                      <td>
                        {historyItem.syllabuses[historyItem.syllabuses.length - 1].validator !== undefined
                          ? historyItem.syllabuses[historyItem.syllabuses.length - 1].validator.username
                          : 'NaN'}
                      </td>
                      <td>
                        {authCtx.role === 'admin' || authCtx.role === 'chairman' ? (
                          <button onClick={() => {}}>
                            <Link id="link" to={'/course/' + historyItem.course._id}>
                              <EditIcon />
                            </Link>
                          </button>
                        ) : (
                          <button onClick={() => {}}>
                            <Link id="link" to={'/course/' + historyItem.course._id}>
                              <InfoIcon />
                            </Link>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Loading />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
