const Joi = require('joi');
const { checkValidId } = require('../utils/features');

const applyLeaveSchema = Joi.object({
    employeeId: Joi.string().required().custom(checkValidId('Invalid Employee Id')),
    date: Joi.string().required(),
    reason: Joi.string().required(),
    docs : Joi.any().optional(),
});

const updateLeaveStatusSchema = Joi.object({
    leaveId: Joi.string().required().custom(checkValidId('Invalid Leave Id')),
    status: Joi.string().required(),
});

const queryLeaveSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    pageSize: Joi.number().min(1).max(100).default(10),
    search: Joi.string().allow('').optional(),
    status: Joi.string().allow('').optional(),
})


const approvedLeavesSchema = Joi.object({
    date: Joi.string().optional(),
});

module.exports = {
    applyLeaveSchema: applyLeaveSchema,
    queryLeaveSchema : queryLeaveSchema,
    updateLeaveStatusSchema: updateLeaveStatusSchema,
    approvedLeavesSchema : approvedLeavesSchema,
}