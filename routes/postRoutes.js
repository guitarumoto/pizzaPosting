const express = require('express');
const { createPost } = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', authenticateToken, upload.single('image'), createPost);

module.exports = router;