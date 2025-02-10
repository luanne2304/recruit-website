const reportModel = require("../Models/reportModel");

const reportController = {
  create: async (req, res, next) => {
    try {
      const { idpost, reason } = req.body;
      const createReport = await reportModel.create({
        idpost:idpost,
        description: reason,
        from: req.user._id,
      });
      return res.status(200).json({
        success: true,
        data: createReport,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  },

  getALL: async (req, res, next) => {
    try {
      const getReport = await reportModel
      .find({ status: "pending" })
      .populate({
        path: "idpost",  
        select: "title status CO", 
        populate: {
          path: "CO", 
          select: "name logo ",
        },
      })
      .populate({
        path: "from",
        select: "email", // Lấy thông tin user
      })
      .sort({ createdAt: -1 });

      if (!getReport || getReport.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không có báo cáo nào đang chờ xử lý.",
          data: [],
        });
      }
      return res.status(200).json({
        success: true,
        data: getReport,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getReportById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const getReport = await reportModel.findById(id);
      return res.status(200).json({
        success: true,
        data: getReport,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getReportByStatus: async (req, res, next) => {
    try {
      const { status } = req.params;
      const getReport = await reportModel.find({ status: status });
      return res.status(200).json({
        success: true,
        data: getReport,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateStatusMultiple: async (req, res, next) => {
    try {
      const { ids } = req.body; 
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Danh sách  ko hợp lệ",
        });
      }

      const updateReport = await reportModel.updateMany(
        { _id: { $in: ids } }, 
        { $set: { status:"Seen" } } 
      );

      return res.status(200).json({
        success: true,
        data: updateReport,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};


module.exports = reportController;