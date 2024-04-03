const express = require("express");
const postRouter = express.Router();
const postController = require("../Controllers/postController");


postRouter.post("/api/user/login", postController.login);


module.exports = postRouter;