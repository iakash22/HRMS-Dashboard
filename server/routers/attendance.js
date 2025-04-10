const express = require('express');
const controllers = require('../controllers');
const { createValidator } = require("express-joi-validation");
const validators = require('../validators');
const errors = require('../constant/errors');
const middlewares = require('../middlewares');

const validation = createValidator({});
const router = express.Router();

router.use(
    validation.headers(validators.authValidator.headerTokenSchema),
    middlewares.authMiddlewares.verifyToken
);

router.get('/',
    validation.query(validators.attendanceValidator.queryAttanceSchema),
    async (req, res) => {
        try {
            const data = await controllers.attendanceControllers.getAndSearchAttendance(req.query);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while get and search employee attendance route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });


router.post('/mark',
    validation.body(validators.attendanceValidator.markAttendanceSchema),
    async (req, res) => {
        try {
            const data = await controllers.attendanceControllers.markAttendance(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while mark attendance route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });



module.exports = router;