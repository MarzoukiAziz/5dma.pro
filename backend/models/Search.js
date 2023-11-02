const mongoose = require("mongoose");

const searchSchema = mongoose.Schema({
    date: { type: Date, required: false },
    keys: { type: String, required: false },
    place: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Search", searchSchema);
