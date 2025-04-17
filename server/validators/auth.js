const Joi = require('joi');

const registerSchema = Joi.object({
    fullName: Joi.string().min(2).max(50).trim().required().pattern(/^[a-zA-Z\s]+$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
}).required()

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
}).required();

const headerTokenSchema = Joi.object({
    authorization: Joi.string()
        .trim()
        .required()
        .messages({
            "any.required": "Authorization token is missing"
        })
}).unknown(true);


module.exports = {
    registerSchema: registerSchema,
    loginSchema: loginSchema,
    headerTokenSchema : headerTokenSchema,
}