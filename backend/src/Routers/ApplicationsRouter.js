const express = require("express");
const ApplicationsRouter = express.Router();
const ApplicationsController = require("../Controllers/ApplicationsController");


ApplicationsRouter.post("/api/Applications/apply", ApplicationsController.apply);
ApplicationsRouter.get("/api/Applications/getApplyPendingbyPost/:id", ApplicationsController.getApplyPendingbyPost);

module.exports = ApplicationsRouter;