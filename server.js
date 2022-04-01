require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/database');

const authRoutes = require('./routes/auth');
const exercisesRoutes = require('./routes/exercises');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users;';
    db.query(sql, (error, results) => {
        if (error) throw error;

        res.json({ data: results }).status(200);
    });
});

app.use('/auth', authRoutes);
app.use('/exercises', exercisesRoutes);

app.listen('5000', () => {
    console.log('Server is listenning on port 5000');
});
