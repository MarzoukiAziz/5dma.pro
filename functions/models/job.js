const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    title: { type: String, required: true },
    contract: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    remote: { type: String, required: false },
    details: { type: String, required: true },
    function: { type: String, required: true },
    startingDate: { type: String, required: true },
    deadline: { type: String, required: false },
    link: { type: String, required: true },
    expired: { type: Boolean, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
});

module.exports = mongoose.model("Job", jobSchema);
