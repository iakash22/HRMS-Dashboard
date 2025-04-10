const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'CandidateToEmployee', required: true },
    date: { type: Date, required: true }, 
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    comments: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);