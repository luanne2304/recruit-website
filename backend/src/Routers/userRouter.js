const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");
const Authorization = require("../middleware/userAuth");  


userRouter.post("/api/user/login", userController.login);
userRouter.post("/api/user/signup", userController.signup);
userRouter.post("/api/user/signinnwithGmail", userController.signinnwithGmail);
userRouter.get("/api/user/",Authorization.authenticateUser, userController.getUserById);
userRouter.get("/api/user", userController.getAllUser);
userRouter.delete("/api/user/:id", userController.deleteUser);
userRouter.put("/api/user/resetPassword/:id", userController.resetPassword);
userRouter.put("/api/user",Authorization.authenticateUser, userController.updateUser);




module.exports = userRouter;