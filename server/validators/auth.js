const Joi = require('joi');
const { isValidObjectId } = require('mongoose');

const registerSchema = Joi.object({
    fullName: Joi.string().min(2).max(50).trim().required().pattern(/^[a-zA-Z\s]+$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
}).required()

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
}).required();

const logoutSchema = Joi.object({
    userId: Joi.string()
        .required()
        .custom((value, helpers) => {
            console.log("Logout", value);
            if (!isValidObjectId(value)) {
                return helpers.message('Invalid User Id');
            }
            return value;
        })
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
    logoutSchema: logoutSchema,
    headerTokenSchema : headerTokenSchema,
}