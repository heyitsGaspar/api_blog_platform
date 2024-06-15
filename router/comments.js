const express = require('express');
const { createComment, deleteComment, getCommentsByPostId } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:postId/comments', authMiddleware, createComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);
router.get('/:postId/comments', getCommentsByPostId);

module.exports = router;
