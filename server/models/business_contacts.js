let mongoose = require('mongoose');
let contactList = mongoose.Schema({
    contact_name: String,
    contact_number: String,
    contact_email: String
},
{
    collection:"business_contacts"
});

module.exports = mongoose.model('business_contacts', contactList);