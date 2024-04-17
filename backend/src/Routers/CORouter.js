const express = require("express");
const CORouter = express.Router();
const COController = require("../Controllers/COController");
const { upload } = require('../middleware/multer')


CORouter.post("/api/CO/create",upload, COController.create);

module.exports = CORouter;