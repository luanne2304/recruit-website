const express = require("express");
const AuditlogRouter = express.Router();
const AuditlogController = require("../Controllers/AuditlogController");
const Authorization = require('../middleware/userAuth')

AuditlogRouter.get("/api/Auditlog/getAll",Authorization.authenticateUser, AuditlogController.getALL);

module.exports = AuditlogRouter;