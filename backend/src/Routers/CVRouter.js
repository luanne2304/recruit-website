const express = require("express");
const CVRouter = express.Router();
const CVController = require("../Controllers/CVController");
const { uploadPDF } = require('../middleware/multer')


CVRouter.post("/api/CV/uploadCV/:id",uploadPDF, CVController.uploadCV);


module.exports = CVRouter;