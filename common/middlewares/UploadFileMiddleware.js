const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where the file should be saved
    cb(null, './uploads/');  // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    // Set the file name as the current timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to avoid overwriting
  },
});

// Define file size limit and file type filter (optional)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Max file size: 10MB
  fileFilter: (req, file, cb) => {
    // Allow only image files
    const fileTypes = /jpg|jpeg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only image files are allowed!'));
    }
  },
});

module.exports = {
// Create a middleware function
    uploadMiddleware : (req, res, next) => {
    req.filepath = storage.filename;
  // Using multer's upload.single() method to handle a single file upload
  upload.single('file')(req, res, (err) => {
    if (err) {
      // Handle errors (e.g., file size, file type, etc.)
      return res.status(400).json({ message: err.message });
    }
    console.log(req)

    next();
  });
}
}