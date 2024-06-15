const { uploadImageToCloudinary } = require("../libs/cloudinary");
const { VALID_IMAGE_EXTENSION } = require("../libs/multer");

async function uploadMiddleware(req, res, next) {
  const file = req.file;
  console.log(file);
  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const imageBuffer =  file.buffer;
  const result = await uploadImageToCloudinary(imageBuffer)
  console.log('Image uploaded to cloudinary');

  req.imageUrl = result.secure_url;

  next();
}

module.exports = uploadMiddleware;