import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import SocketAPIs from './APIs/socket-apis';
function App() {
  const [roomID, setRoomID] = useState('');
  useEffect(() => {
    const socket = io('http://localhost:7000');
    socket.on('connect', () => {
      console.log('You connected with id: ' + socket.id);
      setRoomID((prevState) => socket.id);
    });
    const obj = {
      number: 10,
      obj: { abc: 123 },
    };
    const room = roomID;
    socket.emit('sendRoomID', room);
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
      </header>
    </div>
  );
}

export default App;
