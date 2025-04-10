const Attendance = require('./attendance');
const Candidate = require('./candidate');
const Employee = require('./employee');
const Leave = require('./leave');
const CandidateToEmployee = require('./candidateToEmpolyee');
const User = require('./user');
const Task = require('./task');


module.exports = {
    User: User,
    Attendance: Attendance,
    Candidate: Candidate,
    Employee: Employee,
    Leave: Leave,
    CandidateToEmployee: CandidateToEmployee,
    Task : Task,
}