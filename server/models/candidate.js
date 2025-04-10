const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    position: { type: String, default: "" },
    experience: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    status: {
        type: String,
        enum: ['New', 'Selected', 'Rejected', 'Ongoing', 'Scheduled'],
        default: 'New'
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Candidate', candidateSchema);