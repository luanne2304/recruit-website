const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");
const Authorization = require("../middleware/userAuth");  
const Validation =require("../middleware/validationMiddleware")
const {upload}= require("../middleware/multer")


userRouter.get("/api/user/getAllUsers", userController.getAllUser);
userRouter.put("/api/user/update/:id",Authorization.authenticateUser,upload,Validation.validateUserUpdate, userController.updateUser);
userRouter.put("/api/user/update-status", Authorization.authenticateUser,userController.updateStatusMultipleUser);
userRouter.get("/api/user/getCVsAppliedbyUser", userController.getCVsAppliedbyUser);
userRouter.get("/api/user/GetUser",Authorization.authenticateUser, userController.getUserById);
// userRouter.delete("/api/user/:id", userController.deleteUser);
userRouter.put("/api/user/resetPassword",Authorization.authenticateUser, userController.resetPassword);


module.exports = userRouter;