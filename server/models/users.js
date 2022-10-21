let mongoose = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

let user = mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    /*
            password:{
                type: String,
                default:'',
                trim:true,
                required:'user password required'
            }
            */
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'email address is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },

    created: {
        type: Date,
        default: Date.now
    },

    update: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "user"
})


let options = ({ missingPasswordError: 'wrong/Missing Password' });
user.plugin(passportLocalMongoose, options);
module.exports.user = mongoose.model("user", user);
