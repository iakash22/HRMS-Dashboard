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


router.post('/edit',
    validation.body(validators.employeeValidator.editEmployeeSchema),
    async (req, res) => {
        try {
            // console.log("resume file", req.file);
            const data = await controllers.employeeControllers.editEmployee(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while edit employee route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });

router.delete(
    '/delete/:employeeId',
    validation.params(validators.employeeValidator.deleteEmployeeSchema),
    async (req, res) => {
        try {
            // console.log("resume file", req.file);
            const data = await controllers.employeeControllers.deleteEmployee(req.params);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while delete employee route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });

router.get('/',
    validation.query(validators.employeeValidator.queryEmployeeSchema),
    async (req, res) => {
        try {
            const data = await controllers.employeeControllers.getAndSearchEmployees(req.query);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while get and search employee route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });

module.exports = router;