const express = require("express");
const reportRouter = express.Router();
const reportController = require("../Controllers/reportController");
const Authorization =require("../middleware/userAuth")


reportRouter.post("/api/report/create",Authorization.authenticateUser, reportController.create);
reportRouter.get("/api/report/getAll", reportController.getALL);
reportRouter.put("/api/report/update-Status",Authorization.authenticateUser, reportController.updateStatusMultiple);

module.exports = reportRouter;