const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: false },
    secteur: { type: String, required: false },
    type: { type: String, required: false },
    linkedin: { type: String, required: false },
    twitter: { type: String, required: false },
    website: { type: String, required: false },
    icon: { type: String, required: true },
    creationDate: { type: String, required: true },
    internationalPresence: { type: String, required: true }
});

module.exports = mongoose.model("Company", companySchema);
