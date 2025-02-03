const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/authController");
const Authorization = require("../middleware/userAuth");  
const { uploadPDF } = require('../middleware/multer');


authRouter.post("/api/auth/login", authController.login);
authRouter.post("/api/auth/test", Authorization.authenticateUser,authController.test);
authRouter.post("/api/auth/signup", authController.signup);
authRouter.post("/api/auth/signinnwithGmail", authController.signinnwithGmail);
authRouter.post("/api/auth/logout", authController.logout);

module.exports = authRouter;