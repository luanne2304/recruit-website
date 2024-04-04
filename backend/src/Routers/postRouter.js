const express = require("express");
const postRouter = express.Router();
const postController = require("../Controllers/postController");


postRouter.post("/api/post/create", postController.create);
postRouter.get("/api/post/getALLjob", postController.getALLjob);


module.exports = postRouter;