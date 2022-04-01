require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/database');

const authRoutes = require('./routes/auth');
const exercisesRoutes = require('./routes/exercises');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/exercises', exercisesRoutes);

app.listen('5000', () => {
    console.log('Server is listenning on port 5000');
});
