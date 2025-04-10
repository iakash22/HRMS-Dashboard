// models/Leave.js
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'CandidateToEmployee', required: true },
    reason: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    docsUrl: { type: String, default: "" }, 
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Leave', leaveSchema);
