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


router.post('/apply',
    middlewares.multerMiddlewares.singleFile,
    validation.body(validators.leaveValidator.applyLeaveSchema),
    async (req, res) => {
        try {
            // console.log("resume file", req.file);
            const data = await controllers.leaveControllers.applyLeave({ ...req.body, resume: req.file });
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while apply leave route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });


router.get(
    '/',
    validation.query(validators.leaveValidator.queryLeaveSchema),
    async (req, res) => {
        try {
            const data = await controllers.leaveControllers.getAndSearchLeaves(req.query);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while get and search leave route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    }
);

router.get(
    '/approvedLeaveCount',
    // validation.body(validators.leaveValidator.updateLeaveStatusSchema),
    async (req, res) => {
        try {
            const data = await controllers.leaveControllers.getLeaveCountsByDate(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while approved leave count route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    }
)
router.put(
    '/update',
    validation.body(validators.leaveValidator.updateLeaveStatusSchema),
    async (req, res) => {
        try {
            const data = await controllers.leaveControllers.updateLeaveStatus(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while update leave status route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    }
)



module.exports = router;