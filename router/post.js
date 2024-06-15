const express = require('express');
const { upload } = require('../libs/multer');
const { createPost, updatePost, deletePost, getPost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();


router.post('/', [authMiddleware,upload.single('image'), uploadMiddleware],  createPost); 
router.put('/:postId', authMiddleware, updatePost);
router.delete('/:postId', authMiddleware, deletePost);
router.get('/:postId', getPost);
router.get('/', getAllPosts);

module.exports = router;

