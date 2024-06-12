const express = require('express');
const { createPost, updatePost, deletePost, getPost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.put('/:postId', authMiddleware, updatePost);
router.delete('/:postId', authMiddleware, deletePost);
router.get('/:postId', getPost);
router.get('/', getAllPosts);

module.exports = router;
