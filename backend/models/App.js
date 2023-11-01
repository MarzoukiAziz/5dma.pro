const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
    date: { type: Date, required: true },
    status: { type: String, required: true },
    comment: { type: String, required: false },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("App", appSchema);
