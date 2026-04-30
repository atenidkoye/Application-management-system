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
    User: user,
    createUser: async (email, password) => {
        return await new user({
            email,
            password,
            createdAt: new Date()
        }).save()
    }
}