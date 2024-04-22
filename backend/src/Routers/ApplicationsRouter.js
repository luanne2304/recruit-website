const express = require("express");
const ApplicationsRouter = express.Router();
const ApplicationsController = require("../Controllers/ApplicationsController");


ApplicationsRouter.post("/api/Applications/apply", ApplicationsController.apply);

module.exports = ApplicationsRouter;