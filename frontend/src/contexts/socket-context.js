import React, { useEffect, useState } from 'react';
import SocketAPIs from '../APIs/socket-apis';
import MySocket from '../classes/SocketClass';
import { io } from 'socket.io-client';

const SocketContext = React.createContext({
  mySocket: null,
});

export const SocketContextProvider = (props) => {
  const [mySocket, setMySocket] = useState(new MySocket('http://localhost:7000/').io);


  return (
    <SocketContext.Provider
      value={{
        mySocket: mySocket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
