const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'CandidateToEmployee', required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Not Mark', 'Present', 'Absent', 'Leave', 'Medical Leave', 'Work From Home'],
        default: 'Present'
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
