const authControllers = require('./auth');
const candidateControllers = require('./candidate');
const employeeControllers = require('./employee');
const attendanceControllers = require('./attendance');
const leaveControllers = require('./leave');

module.exports = {
    authControllers : authControllers,
    candidateControllers: candidateControllers,
    employeeControllers: employeeControllers,
    attendanceControllers: attendanceControllers,
    leaveControllers : leaveControllers,
}