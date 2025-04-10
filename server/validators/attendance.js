const Joi = require('joi');
const { checkValidId } = require('../utils/features');

const markAttendanceSchema = Joi.object({
    employeeId: Joi.string().required().custom(checkValidId('Invalid Employee Id')),
    status: Joi.string().required(),
    task: Joi.string().optional(),
})

const queryAttanceSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    pageSize: Joi.number().min(1).max(100).default(10),
    search: Joi.string().allow('').optional(),
    status: Joi.string().allow('').optional(),
});


module.exports = {
    markAttendanceSchema: markAttendanceSchema,
    queryAttanceSchema : queryAttanceSchema
}