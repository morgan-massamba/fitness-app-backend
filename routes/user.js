const express = require('express');
const router = express.Router();

const { getUser, deleteUser } = require('../controllers/user');

router.get('/', getUser);
router.delete('/delete', deleteUser);

module.exports = router;
