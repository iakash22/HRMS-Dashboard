const Attendance = require('./attendance');
const Leave = require('./leave');
const CandidateToEmployee = require('./candidateToEmpolyee');
const User = require('./user');
const Task = require('./task');


module.exports = {
    User: User,
    Attendance: Attendance,
    Leave: Leave,
    CandidateToEmployee: CandidateToEmployee,
    Task : Task,
}