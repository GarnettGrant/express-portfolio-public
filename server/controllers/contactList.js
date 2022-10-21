let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Contact = require('../models/contacts');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(ContactList);
            res.render('contactList/list', { title: 'Contacts', ContactList: contactList });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contactList/add', { title: 'Add Contact' })

}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "contact_name": req.body.name,
        "contact_number": req.body.number,
        "contact_email": req.body.email
    });
    Contact.create(newContact, (err, contact) => {
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
    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contactList/edit', { title: 'Edit Contact', contact: contactToEdit });

        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    console.log(req.body);
    let updatedContact = Contact({
        "_id": id,
        "contact_name": req.body.name,
        "contact_number": req.body.number,
        "contact_email": req.body.email
    
    });
    Contact.updateOne({ _id: id }, updatedContact, (err) => {
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
    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
};