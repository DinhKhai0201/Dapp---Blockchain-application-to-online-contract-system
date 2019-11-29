// server.js
const express = require('express');
const app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const personsRoute = require('./persons.route');
const chatRoute = require('./chats.route');
let Chat = require("./chat.model");


mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{ useUnifiedTopology: true , useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/persons', personsRoute);
app.use('/chats', chatRoute);
server.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});
io.sockets.on('connection', function (socket) {
    socket.on('newMessage', data => {
        let obj = {
            from: data.from,
            to: data.to,
            add_from: data.add_from,
            add_to: data.add_to,
            massage: data.massage
            // created: new Date()
        };
         let chat = new Chat(obj);
         chat.save().then(chats => {
           console.log(chats)
             io.sockets.emit("newMessage", { data: chats, id: socket.id });
         })
        Chat.find({ add_from: data.add_from,add_to:data.add_to }, (err, chatt) => {
            if (err) {
                res.status(200).json({ err: err });
            }
            else {
                if (chatt.length <= 1) {
                    let respon = {
                        from: data.to,
                        to: data.from,
                        add_from: data.add_to,
                        add_to: data.add_from,
                        massage: "Waiting for response soon"
                        // created: new Date()
                    };
                    let chat = new Chat(respon);
                    chat.save().then(chatsr => {
                        console.log(chatsr)
                        io.sockets.emit("newMessage", { data: chatsr, id: socket.id });
                    })
                }

            }
        });
    })
    console.log(socket.id + ': connected');
    socket.emit('id', socket.id);
    socket.on('disconnect', function (data) {
        if (!socket.nickname) return;
        delete users[socket.nickname];
    });
});