const express = require("express");
const ApplicationsRouter = express.Router();
const ApplicationsController = require("../Controllers/ApplicationsController");
const Authorization = require('../middleware/userAuth')


ApplicationsRouter.post("/api/Applications/apply", ApplicationsController.apply);
ApplicationsRouter.put("/api/Applications/updateStatusApply/:id",Authorization.authenticateUser, ApplicationsController.updateStatusApply);
ApplicationsRouter.get("/api/Applications/getApplyPostByStatus/:id",Authorization.authenticateUser, ApplicationsController.getApplyPostByStatus);
ApplicationsRouter.get("/api/Applications/getCVsAppliedbyUser",Authorization.authenticateUser, ApplicationsController.getCVsAppliedbyUser);

module.exports = ApplicationsRouter;