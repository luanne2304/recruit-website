const express = require("express");
const postRouter = express.Router();
const postController = require("../Controllers/postController");


postRouter.post("/api/post/create", postController.create);
postRouter.get("/api/post/getALLjob", postController.getALLjob);
postRouter.get("/api/post/getFilterjob", postController.getFilterjob);
postRouter.get("/api/post/getDetailjob/:id", postController.getDetailjob);
postRouter.get("/api/post/getALLJobbyCO/:id", postController.getALLJobbyCO);

module.exports = postRouter;