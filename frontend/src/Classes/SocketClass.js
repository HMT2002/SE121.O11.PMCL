import { io } from 'socket.io-client';


class MySocket {
    constructor(URL){
        this.io = io(URL);
        
    }
    on(eventName,cb){
        cb();
    }
    emit(eventName,room){
    }

}