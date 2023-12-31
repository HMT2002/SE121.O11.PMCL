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

const socketController = require('./controllers/socketController');
const { Server } = require('socket.io');
const io = new Server(httpServer, {
  cors: {
    origin: ['*', 'https://admin.socket.io'],
    credentials: true,
  },
});
const { instrument } = require('@socket.io/admin-ui');

io.on('connection', socketController.connection);

instrument(io, {
  auth: false,
});
