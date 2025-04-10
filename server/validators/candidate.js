const Joi = require('joi');
const { checkValidId } = require('../utils/features');

const queryCandidatesSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    pageSize: Joi.number().min(1).max(100).default(10),
    search: Joi.string().allow('').optional(),
    position : Joi.string().allow('').optional(),
    status : Joi.string().allow('').optional(),
});

const createCandidateSchema = Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().required(),
    position: Joi.string().required(),
    experience: Joi.string().required(),
})

const updateCandidateStatusSchema = Joi.object({
    status: Joi.string().required(),
    candidateId: Joi.string().required().custom(checkValidId('Invalid Candidate Id'))
})

const deleteCandidateSchema = Joi.object({
    candidateId: Joi.string().required().custom(checkValidId('Invalid Candidate Id'))
})

module.exports = {
    queryCandidatesSchema: queryCandidatesSchema,
    createCandidateSchema: createCandidateSchema,
    updateCandidateStatusSchema: updateCandidateStatusSchema,
    deleteCandidateSchema : deleteCandidateSchema,
}