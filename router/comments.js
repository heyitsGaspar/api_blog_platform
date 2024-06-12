const express = require('express');
const { createComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:postId/comments', authMiddleware, createComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;
