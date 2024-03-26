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
  const [logList, setLogList] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/v1/syllabus').then((res) => {
      console.log(res.data);
      setHistoryList(res.data.data);
    });
    axios.get('/api/v1/logs').then((res) => {
      console.log(res.data);
      setLogList(res.data.data);
    });
  }, []);

  return (
    <div className="home-section">
      <div id="home-container">
        <div className="account-table-container">
          <h1>Danh sách môn học</h1>
          <div className="button-container">
            <div>
              <button className="add-new-button">
                <Link id="link" to={'/new'}>
                  <FiberNewIcon />
                </Link>
              </button>
            </div>
          </div>
          <div className="table-container">
            {' '}
            <table className="table">
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
                    if (historyItem.versions.length === 0) {
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
                    const updatedDate = new Date(historyItem.versions[historyItem.versions.length - 1].date);
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
                          {historyItem.versions[historyItem.versions.length - 1].syllabus.author !== undefined
                            ? historyItem.versions[historyItem.versions.length - 1].syllabus.author.username
                            : 'NaN'}
                        </td>
                        <td>{str}</td>

                        <td>{historyItem.versions[historyItem.versions.length - 1].syllabus.status}</td>
                        <td>
                          {historyItem.versions[historyItem.versions.length - 1].syllabus.validator !== undefined
                            ? historyItem.versions[historyItem.versions.length - 1].syllabus.validator.username
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

      <div className="recent-activity">
        <h5 className="card-title">Hoạt động gần đây</h5>

        <div className="card-body">
          <div className="list-activities">
            {logList.map((logItem, index) => {
              const createdDate = new Date(logItem.createdDate);
              const str =
                createdDate.getUTCFullYear() +
                '/' +
                (createdDate.getUTCMonth() + 1) +
                '/' +
                createdDate.getUTCDate() +
                ' ' +
                createdDate.getUTCHours() +
                ':' +
                createdDate.getUTCMinutes();
              return (
                <div class={`activity-item${index % 2 !== 0 ? '-odd' : ''}`}>
                  <div class="activity-content">
                    - {logItem.message} {str}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
