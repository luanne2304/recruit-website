const express = require("express");
const postRouter = express.Router();
const postController = require("../Controllers/postController");
const Authorization = require("../middleware/userAuth");


postRouter.post("/api/post/create",Authorization.authenticateUser, postController.create);
postRouter.put("/api/post/update/:id",Authorization.authenticateUser, postController.update);
postRouter.get("/api/post/getALLjob", postController.getALLjob);
postRouter.get("/api/post/getFilterjob", postController.getFilterjob);
postRouter.get("/api/post/getbyID/:id", postController.getDetailjob);
postRouter.get("/api/post/getALLJobbyCO/:id", postController.getALLJobbyCO);
postRouter.get("/api/post/getSearchjob", postController.getSearchjob);

module.exports = postRouter;