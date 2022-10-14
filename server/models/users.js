"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    DisplayName: String,
    username: String,
    EmailAddress: String,
    Created: {
        type: Date,
        default: Date.now()
    },
    Updated: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "user"
});
var Model = mongoose_1.default.model("Users", UserSchema);
exports.default = Model;
