const express = require('express');
const router = express.Router();

const exercisesController = require('../controllers/exercises');

router.get('/', exercisesController.getAllExercises);
router.get('/:id', exercisesController.getOneExercise);

module.exports = router;
