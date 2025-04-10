const Joi = require('joi');
const { checkValidId } = require('../utils/features');


const editEmployeeSchema = Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    joiningDate: Joi.string().required(),
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
})


module.exports = {
    editEmployeeSchema: editEmployeeSchema,
    deleteEmployeeSchema: deleteEmployeeSchema,
    queryEmployeeSchema: queryEmployeeSchema,
}