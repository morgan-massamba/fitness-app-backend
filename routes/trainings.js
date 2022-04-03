const express = require('express');
const router = express.Router();

const {
    createTraining,
    getAllTrainings,
    getOneTraining,
} = require('../controllers/trainings');

router.post('/create', createTraining);
router.get('/', getAllTrainings);
router.get('/:trainingId', getOneTraining);

module.exports = router;
