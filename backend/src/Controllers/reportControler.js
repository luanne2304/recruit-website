const ReportModel = require("../Models/reportModel");

const reportController = {
  create: async (req, res, next) => {
    try {
      const { title, description, from } = req.body;
      const newReport = new ReportModel({
        title: title,
        description: description,
        from: from,
      });
      const createReport = await ReportModel.create(newReport);
      return res.status(200).json({
        success: true,
        data: createReport,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getALLreport: async (req, res, next) => {
    try {
      const getReport = await ReportModel.find({}).sort({ createdAt: -1 });
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
      const getReport = await ReportModel.findById(id);
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
      const getReport = await ReportModel.find({ status: status });
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

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updateReport = await ReportModel.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
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