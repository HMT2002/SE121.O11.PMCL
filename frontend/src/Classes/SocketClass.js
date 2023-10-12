import { io } from 'socket.io-client';

class MySocket {
  constructor(URL) {
    if (URL !== '') {
      this.io = io(URL);
      if (io.connected === false) {
        console.log('Failed to connect to socket, empty URL!');
      } else {
        console.log('Connecting to socket...');
        this.io.on('connection', socket => {
          console.log('You connected with id: ' + socket.id);
          socket.io=this.io;
        });
      }
    }
  }
  on(eventName, cb) {
    console.log('Class My Socket .on')
    this.io.on(eventName, cb);
  }
  emit(eventName, room) {
    console.log('Class My Socket .emit')

    this.io.emit(eventName, room);
  }
}

export default MySocket;
