const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Chats = new Schema(
  {
    from: {
      type: String
    },
    add_from: {
      type: String
    },
    to: {
      type: String
    },
    add_to: {
      type: String
    },
    massage: {
      type: String
    },
    created: { type: Date, default: Date.now }
    // conversationId: {
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },
    // body: {
    //     type: String,
    //     required: true
    // },
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Persons'
    // }
  },
  {
    collection: "chats"
  }
);

module.exports = mongoose.model('Chats', Chats);
