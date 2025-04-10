const authRoutes = require('./auth');
const candidateRoutes = require('./candidate');
const employeeRoutes = require('./employee');
const attendanceRoutes = require('./attendance');
const leaveRoutes = require('./leave');

module.exports = {
    authRoutes: authRoutes,
    candidateRoutes: candidateRoutes,
    employeeRoutes: employeeRoutes,
    attendanceRoutes: attendanceRoutes,
    leaveRoutes : leaveRoutes,
}