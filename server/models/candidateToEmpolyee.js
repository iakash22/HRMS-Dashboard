const mongoose = require('mongoose');

const candidateToEomployeeSchema = new mongoose.Schema({
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    position: { type: String, default: "" },
    experience: { type: String, default: "" },
    role: { type: String,enum : ["Candidate", "Employee"],  default: 'Candidate' },
    profilePic: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    department: { type: String, default: '' },
    joiningDate : {type : Date, default : null},
    status: {
        type: String,
        enum: ['New', 'Selected', 'Rejected', 'Ongoing', 'Scheduled'],
        default: 'New'
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('CandidateToEmployee', candidateToEomployeeSchema);
