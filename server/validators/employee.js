const Joi = require('joi');
const { checkValidId } = require('../utils/features');


const editEmployeeSchema = Joi.object({
    fullName: Joi.string().optional(),
    phone: Joi.string().min(10).max(15).optional(),
    email: Joi.string().email().optional(),
    position: Joi.string().optional(),
    department: Joi.string().optional(),
    joiningDate: Joi.string().optional(),
    employeeId: Joi.string().required().custom(checkValidId('Invalid Employee Id'))
});


const deleteEmployeeSchema = Joi.object({
    employeeId: Joi.string().required().custom(checkValidId('Invalid Employee Id'))
})

const queryEmployeeSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    pageSize: Joi.number().min(1).max(100).default(10),
    search: Joi.string().allow('').optional(),
    position: Joi.string().allow('').optional(),
    onlyFullName: Joi.boolean().optional().default(false),
})


module.exports = {
    editEmployeeSchema: editEmployeeSchema,
    deleteEmployeeSchema: deleteEmployeeSchema,
    queryEmployeeSchema: queryEmployeeSchema,
}