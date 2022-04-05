const express = require('express');
const router = express.Router();

const {
    createTraining,
    getAllTrainings,
    getOneTraining,
    deleteTraining,
} = require('../controllers/trainings');

router.post('/create', createTraining);
router.get('/', getAllTrainings);
router.get('/:trainingId', getOneTraining);
router.delete('/delete/:trainingId', deleteTraining);

module.exports = router;
