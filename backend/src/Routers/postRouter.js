const express = require("express");
const postRouter = express.Router();
const postController = require("../Controllers/postController");


postRouter.post("/api/post/create", postController.create);
postRouter.get("/api/post/getALLjob", postController.getALLjob);
postRouter.get("/api/post/getDetailjob/:id", postController.getDetailjob);


module.exports = postRouter;