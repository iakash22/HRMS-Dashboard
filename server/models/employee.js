const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    position: { type: String, default: "" },
    experience: { type: String, default: "" },
    role: { type: String, default: 'Employee' },
    profilePic: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Employee', employeeSchema);