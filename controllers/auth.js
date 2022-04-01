const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.login = (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = 'SELECT * FROM users where email = ? ;';

        db.query(sql, email, (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                return res
                    .status(400)
                    .json({ message: 'Utilisateur non trouvé !' });
            }

            const { email: userEmail, id, password: userPassword } = results[0];

            bcrypt.compare(password, userPassword, (error, checkPassword) => {
                if (error) {
                    return res.status(400).json({ error });
                }

                if (!checkPassword) {
                    return res
                        .status(400)
                        .json({ message: 'Mot de passe incorrect !' });
                }

                const token = jwt.sign(
                    { email: userEmail, id: id },
                    process.env.SECRET_SIGN_TOKEN,
                    {
                        expiresIn: '24h',
                    }
                );

                res.status(200).json({
                    message: 'Connexion réussie',
                    token: token,
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.register = (req, res) => {
    try {
        const { firstname, lastname, email, password, age } = req.body;

        if (!firstname || !lastname || !email || !password || !age) {
            return res.status(400).json({ error: 'missing informations' });
        }

        bcrypt.hash(password, 10, (err, hashPassword) => {
            const sql =
                'INSERT INTO users (firstname, lastname, age, email, password) VALUES (?, ?, ?, ?, ?);';

            db.query(
                sql,
                [firstname, lastname, age, email, hashPassword],
                (error, results) => {
                    if (error) {
                        return res.status(400).json({ error });
                    }

                    res.status(201).json({
                        message: 'Utilisateur créé avec succès!',
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
