const express = require('express');
const controllers = require('../controllers');
const { createValidator } = require('express-joi-validation');
const validation = require('../validators');
const errors = require('../constant/errors');

const router = express.Router();
const validator = createValidator();

router.post(
    '/register',
    validator.body(validation.authValidator.registerSchema),
    async (req, res) => {
        try {
            console.log("Req body", req.body);
            const data = await controllers.authControllers.register(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while register user route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    }
)

router.post(
    '/login',
    validator.body(validation.authValidator.loginSchema),
    async (req, res) => {
        try {
            const data = await controllers.authControllers.login(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while login user route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    }
)

router.post(
    "/logout",
    validator.body(validation.authValidator.logoutSchema),
    async (req, res) => {
        try {
            const data = await controllers.authControllers.logout(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while login user route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    }
)

module.exports = router;