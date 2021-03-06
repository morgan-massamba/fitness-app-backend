const db = require('../config/database');

exports.getUser = (req, res) => {
    try {
        const userId = req.userId;
        const sql =
            'SELECT firstname, lastname, email, age, height, weight FROM fitness.users WHERE id = ?';
        db.query(sql, userId, (error, results) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.updateUser = (req, res) => {
    try {
        const userId = req.userId;
        const { firstname, lastname, age, weight, height } = req.body;
        const sql =
            'UPDATE users SET firstname = ?, lastname = ?, age = ?, weight = ?, height = ? WHERE id = ?';
        db.query(
            sql,
            [firstname, lastname, age, weight, height, userId],
            (error, results) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                res.status(200).json({
                    message: 'Utilisateur modifié avec succès',
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteUser = (req, res) => {
    try {
        const userId = req.userId;
        const sql = 'DELETE FROM fitness.users WHERE id = ?';
        db.query(sql, userId, (error, results) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.status(200).json({
                message: 'Votre compte à bien été supprimé',
            });
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
