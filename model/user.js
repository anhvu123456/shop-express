var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{type: String,
           required: true,
           unique: true,},
    password: String,
    name: String,
    avatar: String,
    phone: String
});

var User = mongoose.model("User", userSchema, "user");

module.exports = User;