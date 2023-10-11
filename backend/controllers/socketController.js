
exports.connection =(socket) =>{
 console.log(socket.id);
 socket.on('sendRoomID', (room) => {
  customEvent(room,socket);

});
 socket.on('joinRoom',(room,cb)=>{
   joinRoom(room,cb,socket)
 })
}
const customEvent= (room,socket)=>{  
  if (room === '') {
    //socket.emit('receiveNotiAll', { message: 'received! ' + socket.id });
    //broadcast là gửi thông báo đến mọi user NGOẠI TRỪ user gọi lên
    socket.broadcast.emit('receiveNotiAll', { message: 'Notify All!' });
    console.log('Found no room, empty!')
  } else {
    //room có tồn tại, nên không truyền broadcast nữa
    //to room là gửi đến room của người kia thông qua ID
    socket.to(room).emit('receiveNotiMe', { message: 'room found, received! ' + socket.id });
  }
}
const joinRoom= (room,cb,socket)=>{
  //cb là callback, có thể truyền hàm của cluent, sau khi join thì bên client sẽ thực hiện cb
  socket.join(room)
}
