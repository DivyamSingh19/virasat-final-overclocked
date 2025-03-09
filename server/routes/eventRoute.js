// routes/eventRoutes.js
const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');
const auth = require('../middleware/auth');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Temporary storage before uploading to Cloudinary
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024  // 5MB size limit
  }
});

// Public routes
eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:id', eventController.getEventById);

// Protected routes - require authentication
eventRouter.post('/', auth.verifyAdmin, upload.single('featuredImage'), eventController.createEvent);
eventRouter.put('/:id', auth.verifyAdmin, upload.single('featuredImage'), eventController.updateEvent);
eventRouter.delete('/:id', auth.verifyAdmin, eventController.deleteEvent);

module.exports = eventRouter;