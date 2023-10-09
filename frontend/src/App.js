import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState, useRef } from 'react';

function App() {
  const [roomID, setRoomID] = useState('');



  useEffect(()=>{
      const socket = io('http://localhost:7000');
  socket.on('connect', () => {
    console.log('You connected with id: ' + socket.id);
    setRoomID((prevState) => socket.id);
  });
  const message= {
    number: 10,
    obj: { abc: 123 },
  }
  const room=roomID;
  socket.emit('custom-event',message,room);
  socket.on('receive-noti-all', (message) => {
    console.log(message);
  });
  socket.on('receive-noti-all-but-me', (message) => {
    console.log(message);
  });
  },[]);
  
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
