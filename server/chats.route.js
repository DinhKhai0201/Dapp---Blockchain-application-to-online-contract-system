// chats.route.js
const express = require('express');
const chatRoutes = express.Router();

// Require Business model in our routes module
let Chat = require('./chat.model');

// Defined store route
chatRoutes.route('/add').post(function (req, res) {
    let chat = new Chat(req.body);
    chat.save()
        .then(chat => {
            res.status(200).json({ chat: chat });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
});
// Defined get data(index or listing) route
chatRoutes.route("/").get(function(req, res) {
  Chat.find(function(err, chats) {
    if (err) {
      console.log(err);
    } else {
      res.json(chats);
    }
  });
});
// Defined get data(index or listing) route
chatRoutes.route('/getchat').get(function (req, res) {
    let chat = new Chat(req.body);
    console.log(req.body);
    Chat.find({ add_from: chat.add_from},(err, chat) =>{
        if (err) {
            res.status(200).json({ err :err});
        }
        else {
            res.status(200).json({ chat: chat });
        }
    });
});
// Defined get data(index or listing) route
chatRoutes.route('/getonline').get(function (req, res) {
  let param = req.query.add_from;
  console.log(req.query)
  Chat.find({ add_from: param },(err, chat) =>{
        if (err) {
            res.status(200).json({ err :err});
        }
        else {
          // let a = chat.reverse();
          let a = chat;
          let dataA = Object.values(a.reduce((acc, cur) => Object.assign(acc, {
              [cur.add_to]: cur
             }), {}))
          res.status(200).json({ chat: dataA });
        }
    });
});
module.exports = chatRoutes;