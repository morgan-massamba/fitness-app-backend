const express = require('express');
const router = express.Router();

const {
    getAllExercises,
    getOneExercise,
    getAllCategories,
} = require('../controllers/exercises');

router.get('/list', getAllExercises);
router.get('/list/:id', getOneExercise);
router.get('/categories', getAllCategories);

module.exports = router;
