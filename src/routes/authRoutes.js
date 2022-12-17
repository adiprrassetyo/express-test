const authRoutes = require('express').Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('../helpers/authMiddleware');
const singleUploadMiddleware = require('../helpers/singleUploadMiddleware');
const cloudinaryMiddleware = require('../helpers/cloudinaryMiddleware');

authRoutes.post('/login', authController.login);
authRoutes.post('/register', singleUploadMiddleware, cloudinaryMiddleware, authController.register);
authRoutes.get("/check", authMiddleware.checkToken);
authRoutes.put("/update", singleUploadMiddleware, cloudinaryMiddleware, authController.update_profile)

module.exports = authRoutes;