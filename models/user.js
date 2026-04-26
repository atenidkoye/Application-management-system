const mongoose = require("mongoose");


// Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: Date
})


// Model
const user = mongoose.model("User", userSchema);


// Export model and functions
module.exports = {
    User: user
}