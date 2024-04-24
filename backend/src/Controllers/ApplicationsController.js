
const ApplicationsModel = require("../Models/ApplicationsModel");
const userModel = require("../Models/userModel");
const postModel = require("../Models/postModel");

const ApplicationsController = {
  
  apply: async (req, res, next) => {
    try {
      const {idCV,idPost }= req.body
        const newApply={
            cvId:idCV,
            postId:idPost
        }
        console.log(newApply)
        const createApply = await ApplicationsModel.create(newApply);
      return res.status(200).json({
        success: true,
        data:createApply
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getApplyPendingbyPost: async (req, res, next) => {
    try {
      const id= req.params.id
      const getApply = await ApplicationsModel.find({postId:id, status:"pending"}).populate("cvId").populate("postId");
      return res.status(200).json({
        success: true,
        data:getApply
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
}

module.exports = ApplicationsController;