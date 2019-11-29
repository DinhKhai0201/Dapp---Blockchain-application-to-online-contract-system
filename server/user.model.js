const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Persons = new Schema({
    name: {
        type: String
    },
    
    address: {
        type: String
    }
}, {
    collection: 'persons'
});

module.exports = mongoose.model('Persons', Persons);