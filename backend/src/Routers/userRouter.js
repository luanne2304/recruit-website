const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");
const Authorization = require("../middleware/userAuth");  
const { uploadPDF } = require('../middleware/multer');


// userRouter.post("/api/user/login", userController.login);
// userRouter.post("/api/user/signup", userController.signup);
// userRouter.post("/api/user/signinnwithGmail", userController.signinnwithGmail);
userRouter.get("/api/user/getCVsAppliedbyUser", userController.getCVsAppliedbyUser);
userRouter.get("/api/user/:id", userController.getUserById);
// userRouter.delete("/api/user/:id", userController.deleteUser);
userRouter.put("/api/user/resetPassword/:id", userController.resetPassword);
// userRouter.patch("/api/user",Authorization.authenticateUser, userController.updateUser);


module.exports = userRouter;