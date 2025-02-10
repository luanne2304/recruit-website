const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/authController");
const Authorization = require("../middleware/userAuth");  



authRouter.post("/api/auth/login", authController.login);
authRouter.post("/api/auth/test", Authorization.authenticateUser,authController.test);
authRouter.post("/api/auth/signup", authController.signup);
authRouter.post("/api/auth/signinnwithGmail", authController.signinnwithGmail);
authRouter.post("/api/auth/logout", Authorization.authenticateUser,authController.logout);
authRouter.get("/api/auth/requestRefreshToken", authController.requestRefreshToken);

module.exports = authRouter;