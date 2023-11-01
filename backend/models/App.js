const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
    date: { type: Date, required: false },
    status: { type: String, required: false },
    comment: { type: String, required: false },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("App", appSchema);
