const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    experience_years: Number,
    primary_skill: String,
    created_at: Date
});

module.exports = mongoose.model("Candidate", candidateSchema);