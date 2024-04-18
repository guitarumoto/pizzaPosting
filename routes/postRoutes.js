const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', authenticateToken, upload.single('image'), createPost);
router.get('/', getPosts);

module.exports = router;