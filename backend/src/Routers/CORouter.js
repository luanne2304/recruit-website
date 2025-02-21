const express = require("express");
const CORouter = express.Router();
const COController = require("../Controllers/COController");
const { upload } = require('../middleware/multer')
const Authorization =require("../middleware/userAuth")
const Validation =require("../middleware/validationMiddleware")


CORouter.post("/api/CO/create",Authorization.authenticateUser,upload,Validation.validateCreateCO, COController.create);
CORouter.put("/api/CO/update/:idCO",Authorization.authenticateUser,upload,Validation.validateUpdateCO, COController.update);
CORouter.put("/api/CO/updateCoverImg/:idCO",Authorization.authenticateUser,upload, COController.updateCoverImg);
CORouter.get("/api/CO/getALL", COController.getAll);
CORouter.get("/api/CO/getCObyID/:id", COController.getCObyID);
CORouter.put("/api/CO/update-status/:id",Authorization.authenticateUser, COController.updateStatus);
CORouter.put("/api/CO/update-idacc/:id",Authorization.authenticateUser, COController.updateIdaccountCO);
CORouter.get("/api/CO/check-ownership",Authorization.authenticateUser, COController.getCObyIDuser);

module.exports = CORouter;