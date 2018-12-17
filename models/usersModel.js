const mongoose = require("mongoose");

// set up a mongoose model and pass it using module.exports
const User = new mongoose.Schema({
    name: String, 
    password: String, 
    admin: Boolean 
});

module.exports = studentModels = mongoose.model("User", User);