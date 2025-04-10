const authValidator = require('./auth');
const candidateValidator = require('./candidate');
const employeeValidator = require('./employee');
const attendanceValidator = require('./attendance');
const leaveValidator = require('./leave');


module.exports = {
    authValidator: authValidator,
    candidateValidator, candidateValidator,
    employeeValidator: employeeValidator,
    attendanceValidator,
    leaveValidator
}