let mongoose = require('mongoose');

let contactModel = mongoose.Schema({
    contact_name: String,
    contact_number: String,
    contact_email: String
},
{
    collection:"business_contacts"
});

module.exports = mongoose.model('contact', contactModel);