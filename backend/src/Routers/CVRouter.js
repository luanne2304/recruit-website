const express = require("express");
const CVRouter = express.Router();
const CVController = require("../Controllers/CVController");
const { uploadPDF } = require('../middleware/multer')


CVRouter.post("/api/CV/uploadCV/:id",uploadPDF, CVController.uploadCV);
CVRouter.get("/api/CV/getCVByIduser/:iduser", CVController.getCVByIduser);


module.exports = CVRouter;