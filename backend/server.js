const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const apiPort = 8000;

const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/err-handlers');

const db = require('./dbfolder/db');

const userRouter = require('./routes/mod_admin-router');
const todolistRouter = require('./routes/todo_list-router');
const activitylogRouter = require('./routes/activity_log-router');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(cors())

app.use(bodyParser.json());

app.use(jwt());

app.get('/',(req,res) => {
    res.send('Helllo World');
});

app.get('/api',(req,res) => {
    res.send('Helllo World..!');
});

app.use('/api',userRouter);
app.use('/api',todolistRouter);
app.use('/api',activitylogRouter);

app.use(errorHandler);

const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
      origin: "*",
    },
  }); 
  
    io.on('connection', (socket) => {
        console.log('User Connected');
        socket.on('activity_log', (data) => {
        io.emit('activity_log',data);  
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

server.listen(apiPort, () => console.log(`server runniong on port ${apiPort}`));