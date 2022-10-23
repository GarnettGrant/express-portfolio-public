let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let contact = require('../models/contacts');
// let Contacts = Contact.find().sort(({contact_name : 1}));

module.exports.displayContactList = (req, res, next) => {
    contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(ContactList);
            res.render('contactList/list',
                {
                    title: 'Contacts',
                    contact: contactList,
                    displayName: req.user ? req.user.displayName : '',
                    loggedIn: req.isAuthenticated()
                });
        }
    }).sort({contact_name : 1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contactList/add',
        {
            title: 'Add Contact',
            displayName: req.user ? req.user.displayName : '',
            loggedIn: req.isAuthenticated()
        })

}

module.exports.processAddPage = (req, res, next) => {
    let newContact = contact({
        "contact_name": req.body.name,
        "contact_number": req.body.number,
        "contact_email": req.body.email
    });
    contact.create(newContact, (err, contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contactList/edit', { 
                title: 'Edit Contact', 
                contact: contactToEdit,
                displayName: req.user ? req.user.displayName : '',
                loggedIn: req.isAuthenticated() });

        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    console.log(req.body);
    let updatedContact = contact({
        "_id": id,
        "contact_name": req.body.name,
        "contact_number": req.body.number,
        "contact_email": req.body.email,

    });
    contact.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
};