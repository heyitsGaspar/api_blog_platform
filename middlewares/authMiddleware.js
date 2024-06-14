const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

// Configuración de multer para limitar el tamaño de archivo a 10MB
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB en bytes
});

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.upload = upload; // Agregar el middleware de multer al objeto request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
