let socket_io = require("socket.io");
const MongoClient = require('mongodb').MongoClient;
var io = socket_io();
var socketApi = {};
var db;

socketApi.io = io;

MongoClient.connect('mongodb+srv://usuario1:usuario1@cluster0-ukami.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('Cluster0');
});

let messages = [{
    id: 1,
    text: "Wecome to chat room",
    author: "Chat admin"
}];

io.on('connection', function (socket){
    io.sockets.emit('messages', messages);

    socket.on("new-message", data => {
        socketApi.sendNotification(data)
    });

    
});

socketApi.sendNotification = data => {
    db.collection('mensajes').insertOne(data, (err, result) => {
        
    });
    db.collection('mensajes').find().toArray();
    let msj = [];
    socketApi.getMessages().toArray(function (err,data){
        data.forEach(element => msj.push({author:element.author,text:element.text}))
            io.sockets.emit('messages',msj);
    });

    io.sockets.emit('messages',msj);
}



socketApi.getMessages = () =>{
    return db.collection('mensajes').find();
}

module.exports = socketApi;