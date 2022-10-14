// Import Mongoose
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    DisplayName: String,
    username: String,
    EmailAddress: String,
    Created:{
        type: Date,
        default: Date.now()
    },
    Updated:{
        type: Date,
        default: Date.now()
    }
},
    {
        collection: "user"
    });

// Step 3 - Create a Model using the Schema
let Model = mongoose.model("Users", UserSchema);

// Step 4 - Export the Model -> this makes the file a module
export default Model;
