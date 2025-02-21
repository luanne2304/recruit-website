const AuditlogModel = require("../Models/AuditlogModel");

const AuditlogController = {
  getALL: async (req, res, next) => {
    try {

      const getall = await AuditlogModel.find().populate("userId", "email").sort({ timestamp: -1 })

      return res.status(200).json({
        success: true,
        data: getall,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },


};


module.exports = AuditlogController;