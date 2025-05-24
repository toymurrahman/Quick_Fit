const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    role : String,
    isBlocked : Boolean
})


module.exports = mongoose.model("Users",userSchema,"Users");