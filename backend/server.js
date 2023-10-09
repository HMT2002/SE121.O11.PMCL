const dotenv = require('dotenv');
var path = require('path');

dotenv.config({ path: './config.env' });

const app = require('./app');

const dbVideoSharing = require('./config/database/db_index');

dbVideoSharing.connect();

const fs = require('fs');

//console.log(process.env);
//START SERVER
const port = process.env.PORT || 7000;
const httpServer = app.listen(port, () => {
  console.log('App listening to ' + port);
});

const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: ['*','https://admin.socket.io'],
    credentials: true,
  },
});
const { instrument } = require("@socket.io/admin-ui");
io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('custom-event', (obj, room) => {
    console.log(obj);
    if (room === '') {
      socket.emit('receive-noti-all', { message: 'received! ' + socket.id });
      //broadcast là gửi thông báo đến mọi user NGOẠI TRỪ user gọi lên
      socket.broadcast.emit('receive-noti-all-but-me', { message: 'received! ' + socket.id });
    } else {
      //to room là gửi đến room của người kia thông qua ID
      socket.to(room).emit('receive-noti-all', { message: 'received! ' + socket.id });
    }
  });

  socket.on('join-room',(room,cb)=>{
    socket.join(room)
  })
});
instrument(io, {
  auth: false
});