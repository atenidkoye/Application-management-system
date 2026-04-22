const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: String,
    position: String,
    status: String,
    source: String,
    applied_at: Date
});

module.exports = mongoose.model("Application", applicationSchema);