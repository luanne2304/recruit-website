const express = require("express");
const CORouter = express.Router();
const COController = require("../Controllers/COController");
const { upload } = require('../middleware/multer')


CORouter.post("/api/CO/create",upload, COController.create);
CORouter.get("/api/CO/getALL", COController.getAll);
CORouter.get("/api/CO/getCObyID/:id", COController.getCObyID);

module.exports = CORouter;