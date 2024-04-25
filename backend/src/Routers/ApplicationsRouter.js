const express = require("express");
const ApplicationsRouter = express.Router();
const ApplicationsController = require("../Controllers/ApplicationsController");


ApplicationsRouter.post("/api/Applications/apply", ApplicationsController.apply);
ApplicationsRouter.get("/api/Applications/getApplyPendingbyPost/:id", ApplicationsController.getApplyPendingbyPost);
ApplicationsRouter.put("/api/Applications/updateStatusApply", ApplicationsController.updateStatusApply);
ApplicationsRouter.get("/api/Applications/getApplyPostByStatus", ApplicationsController.getApplyPostByStatus);

module.exports = ApplicationsRouter;