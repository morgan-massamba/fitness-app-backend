const express = require('express');
const router = express.Router();

const { getUser, deleteUser, updateUser } = require('../controllers/user');

router.get('/', getUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;
