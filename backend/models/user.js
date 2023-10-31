const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    date: { type: Date, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
