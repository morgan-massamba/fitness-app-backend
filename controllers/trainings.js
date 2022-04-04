const db = require('../config/database');

exports.createTraining = (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({
            message: 'Nouveau programme créé avec succès!',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

exports.getAllTrainings = (req, res) => {
    try {
        const userId = req.userId;
        const sql =
            'SELECT fitness.trainings.id, fitness.trainings.title, fitness.trainings.level, COUNT(*) as numberOfExercises FROM fitness.trainings INNER JOIN fitness.training_exercises ON fitness.trainings.id = fitness.training_exercises.training_id WHERE fitness.trainings.user_id = ? GROUP BY fitness.trainings.id;';
        db.query(sql, userId, (error, results) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

exports.getOneTraining = (req, res) => {
    try {
        const userId = req.userId;
        const trainingId = Number(req.params.trainingId);
        const sql =
            'SELECT fitness.trainings.id, fitness.trainings.title, fitness.trainings.level,  fitness.exercises.title as exercise, fitness.training_exercises.sets, fitness.training_exercises.reps from fitness.trainings INNER JOIN fitness.training_exercises ON fitness.trainings.id = fitness.training_exercises.training_id INNER JOIN fitness.exercises ON fitness.training_exercises.exercise_id = fitness.exercises.id WHERE fitness.trainings.user_id = ? AND fitness.trainings.id = ?;';
        db.query(sql, [userId, trainingId], (error, results) => {
            if (error) {
                return res.status(400).json({ error });
            }
            if (results.length > 0) {
                const newArr = [];
                const newObj = {};
                newObj.id = results[0].id;
                newObj.title = results[0].title;
                newObj.level = results[0].level;
                newObj.exercises = results.map((i) => {
                    return {
                        title: i.exercise,
                        sets: i.sets,
                        reps: i.reps,
                    };
                });
                newArr.push(newObj);
                return res.status(200).json(newArr);
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
