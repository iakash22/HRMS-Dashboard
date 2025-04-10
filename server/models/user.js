const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profileUrl : {type : String, default : ""},
    // role: { type: String, enum: ['HR', 'Employee'], default: 'HR' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }, 
    updatedAt: { type: Date, default: Date.now() },
});

module.exports =  mongoose.model('User', userSchema);