const db = require('../config/database');

exports.getAllExercises = (req, res) => {
    try {
        const sql =
            'SELECT fitness.exercises.id, fitness.exercises.title, fitness.exercises.description, fitness.exercise_categories.title as categorie, fitness.exercises.categorie_id FROM fitness.exercises INNER JOIN fitness.exercise_categories ON fitness.exercises.categorie_id = fitness.exercise_categories.id;';
        db.query(sql, (error, results) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getOneExercise = (req, res) => {
    try {
        const id = Number(req.params.id);

        const sql =
            'SELECT fitness.exercises.id, fitness.exercises.title, fitness.exercises.description, fitness.exercises.imageUrl, fitness.exercise_categories.title as categorie FROM fitness.exercises INNER JOIN fitness.exercise_categories ON fitness.exercises.categorie_id = fitness.exercise_categories.id WHERE fitness.exercises.id = ?;';
        db.query(sql, id, (error, results) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllCategories = (req, res) => {
    try {
        const sql = 'SELECT * FROM fitness.exercise_categories;';
        db.query(sql, (error, results) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
