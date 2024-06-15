const multer = require('multer')
const path = require('node:path')

const VALID_IMAGE_EXTENSION = ['.jpg', '.jpeg', '.png']

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  fileFilter: function (_req, file, cb) {
    const fileExtension = path.extname(file.originalname)

    if (!VALID_IMAGE_EXTENSION.includes(fileExtension)) {
      const errorMessage = `Error en extension del archivo, las extensiones validas son ${VALID_IMAGE_EXTENSION.join(', ')}`
      cb(new Error(errorMessage, false))
      return
    }

    cb(null, true)
  }
})

module.exports = {
  upload,
  VALID_IMAGE_EXTENSION
}