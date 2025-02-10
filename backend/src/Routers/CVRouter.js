const express = require("express");
const CVRouter = express.Router();
const CVController = require("../Controllers/CVController");
const { uploadPDF } = require('../middleware/multer');
const Authorization = require('../middleware/userAuth')


CVRouter.post("/api/CV/uploadCV",Authorization.authenticateUser ,uploadPDF, CVController.uploadCV);
CVRouter.get("/api/CV/getCVByIduser",Authorization.authenticateUser , CVController.getCVByIduser);
CVRouter.delete("/api/CV/delCV/:id",Authorization.authenticateUser , CVController.deleteCV);


module.exports = CVRouter;