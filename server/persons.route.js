// persons.route.js

const express = require('express');
const personRoutes = express.Router();

// Require Business model in our routes module
let Person = require('./user.model');

// Defined store route
personRoutes.route('/register').post(function (req, res) {
    let person = new Person(req.body);
    Person.findOne({ address: person.address }, (err, user)=>{
        if(err) return res.status(400).json(err)
        !user ? person.save()
                    .then(person => {
                        res.status(200).json({ person: person.address });
                    })
                    .catch(err => {
                        res.status(400).send("unable to save to database");
                    })
            : res.status(200).json({ 'person': 'false' });
    })
});
// Defined store route
personRoutes.route('/login').post(function (req, res) {
    let person = new Person(req.body);
    Person.findOne({ address: person.address }, (err, user) => {
        if (err) return res.status(400).json(err)
        if (user) {
            res.status(200).json({ person: person.address });
        } else {
            res.status(200).json({ person: 'false' });
        }
    })
});
// Defined get data(index or listing) route
personRoutes.route('/').get(function (req, res) {
    Person.find(function(err, persons){
        if(err){
            console.log(err);
        }
        else {
            res.json(persons);
        }
    });
});
personRoutes.route('/one').get(function (req, res) {
    let person = new Person(req.body);
    Person.findOne({ address: person.address }, (err, user) => {
        if (err) {
            res.status(400).json({ person: err });
        }
        else {
            res.status(200).json({ person: user});
        }
    });
});
module.exports = personRoutes;