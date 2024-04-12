const express = require('express');
const { register, updateUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/register', register);

module.exports = router;