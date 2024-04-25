
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
      const getApply = await ApplicationsModel.find({postId:id, status:"pending"}).populate("cvId");
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

  updateStatusApply: async (req, res, next) => {
    try {
      const { processedCVs } =req.body
      const promises =processedCVs.map( async (item)=>(
        await ApplicationsModel.findByIdAndUpdate(item.cv,{status:item.result})
      ))

      await Promise.all(promises);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getApplyPostByStatus: async (req, res, next) => {
    try {
      const { idpost, status  } =req.query
      const getApply = await ApplicationsModel.find({postId:idpost, status:status}).populate("cvId");

      return res.status(200).json({
        success: true,
        data:getApply
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },


}

module.exports = ApplicationsController;