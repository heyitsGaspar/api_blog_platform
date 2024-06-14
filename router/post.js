const express = require('express');
const multer = require('multer');
const { createPost, updatePost, deletePost, getPost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Configuración de multer para limitar el tamaño de archivo a 10MB
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB en bytes
});

router.post('/', authMiddleware, upload.single('image'), createPost);
router.put('/:postId', authMiddleware, updatePost);
router.delete('/:postId', authMiddleware, deletePost);
router.get('/:postId', getPost);
router.get('/', getAllPosts);

module.exports = router;

