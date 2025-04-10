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


router.post('/create',
    middlewares.multerMiddlewares.singleFile,
    validation.body(validators.candidateValidator.createCandidateSchema),
    async (req, res) => {
        try {
            // console.log("resume file", req.file);
            const data = await controllers.candidateControllers.createCandidate({ ...req.body, resume: req.file });
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while create candidate route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });

router.put(
    '/update',
    validation.body(validators.candidateValidator.updateCandidateStatusSchema),
    async (req, res) => {
        try {
            // console.log("resume file", req.file);
            const data = await controllers.candidateControllers.updateStatus(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while update candidate status route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }

    });

router.delete(
    '/delete/:candidateId',
    validation.params(validators.candidateValidator.deleteCandidateSchema),
    async (req, res) => {
        try {
            // console.log("resume file", req.file);
            const data = await controllers.candidateControllers.deleteCandidate(req.params);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while delete candidate route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });



router.get('/',
    validation.query(validators.candidateValidator.queryCandidatesSchema),
    async (req, res) => {
        try {
            const data = await controllers.candidateControllers.getAndSearchCandidates(req.query);
            return res.status(data.status).json(data);
        } catch (error) {
            console.error("Error Ocurred Occurred while get canidates route", error);
            return res.status(500).json(errors.SERVER_ERROR);
        }
    });



module.exports = router;