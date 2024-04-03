const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");


userRouter.post("/api/user/login", userController.login);
userRouter.post("/api/user/signup", userController.signup);
userRouter.post("/api/user/signinnwithGmail", userController.signinnwithGmail);

module.exports = userRouter;