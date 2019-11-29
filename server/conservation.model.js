const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Conservations = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'Persons' }],
}, {
    collection: 'conservations'
});

module.exports = mongoose.model('Conservations', Conservations);