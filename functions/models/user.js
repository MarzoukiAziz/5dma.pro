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
    role: { type: String, required: true },
    profile: { type: String, required: false },
    experience: [{
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: false },
        monthStart: { type: int, required: true },
        monthEnd: { type: int, required: true },
        yearStart: { type: int, required: true },
        yearEnd: { type: int, required: true },
        role: { type: String, required: true },
    }],
    Education: [{
        school: { type: String, required: true },
        degree: { type: String, required: true },
        field: { type: String, required: true },
        yearStart: { type: int, required: true },
        yearEnd: { type: int, required: true },
    }],
    skills: [{
        name: { type: String, required: true },
    }],
    languages: [{
        title: { type: String, required: true },
        level: { type: String, required: true }
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
