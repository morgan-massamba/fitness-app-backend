require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

//ROUTES
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const exercisesRoutes = require('./routes/exercises');
const trainingsRoutes = require('./routes/trainings');

//MIDDLEWARE
const verifyToken = require('./middleware/verifyToken');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes);
app.use('/exercises', verifyToken, exercisesRoutes);
app.use('/trainings', verifyToken, trainingsRoutes);

app.listen('5000', () => {
    console.log('Server is listenning on port 5000');
});
