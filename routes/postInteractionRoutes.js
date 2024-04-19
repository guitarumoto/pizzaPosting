const express = require('express');
const { addComment, getPostInteraction, addLike } = require('../controllers/postInteractionController');

const router = express.Router();

router.post('/comment', addComment);
router.post('/like', addLike);
router.get('/:postId', getPostInteraction);

module.exports = router;