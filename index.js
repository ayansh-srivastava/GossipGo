const express=require('express');
const http=require('http');
const {join}=require('path');
const socketio=require('socket.io');
const user = require('./models/user');


const app=express();
const server=http.createServer(app);
const io=socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('send_message', (data) => {
        socket.broadcast.emit('new_msg', {
            content: data.content,
            user: data.user
        });
    });

    socket.broadcast.emit('new_msg', {
        content: 'Welcome to the server!',
        user: 'server'
    });
});

app.use(express.static(join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'public','index.html'));
});
app.get('/api',(req,res)=>{
    res.json({message:'Hello from the server!'});
}); 
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});