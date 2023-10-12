import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import SocketAPIs from './APIs/socket-apis';
import SocketContext from './contexts/socket-context';

function App() {
  const [roomID, setRoomID] = useState('');
  const socketContext = useContext(SocketContext);

  const clickButton = () => {
    console.log('pressed');
    const message = {
      number: 10,
      obj: { abc: 123 },
    };
    const socket = socketContext.mySocket;
    socket.emit('sendMessage', message, socket.id);
  };
  useEffect(() => {
    const socket = socketContext.mySocket;
    socket.on('connect', () => {
      console.log('You connected with id: ' + socket.id);
      setRoomID((prevState) => socket.id);
      socket.emit('joinRoom', socket.id);
    });

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
        <button onClick={clickButton}>Press</button>
      </header>
    </div>
  );
}

export default App;
