const ApplicationsModel = require("../Models/ApplicationsModel");
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");

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
      const getApply = await ApplicationsModel.find({postId:id, status:"pending"}).populate({
        path: "cvId", // Populate thông tin CV
        populate: {
            path: "idUser", // Populate tiếp userId từ CV
            select: "fullName", // Tên model User trong Mongoose
        },
    });
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
      const { selectedIds,status } =req.body
      if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Danh sách acc ko hợp lệ",
        });
      }
  
       await ApplicationsModel.updateMany(
        { _id: { $in: selectedIds } }, 
        { $set: { status } } 
      );
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
      const idpost=req.params.id
      const { status  } =req.query
      const getApply = await ApplicationsModel.find({postId:idpost, status:status}).populate({
        path: "cvId", // Populate thông tin CV
        populate: {
            path: "idUser", // Populate tiếp userId từ CV
            select: "fullName", // Tên model User trong Mongoose
        },
    });

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

  getCVsAppliedbyUser: async (req, res, next) => {
    try {
        const iduser = req.user._id;
        let { page, limit } = req.query;

        // Nếu không truyền page hoặc limit thì lấy tất cả
        page = parseInt(page) || 1;
        limit = limit ? parseInt(limit) : null; // Nếu không có limit, lấy tất cả
        const skip = (page - 1) * (limit || 0);

        const queryPipeline = [
            {
                $match: { "_id": new mongoose.Types.ObjectId(iduser) }
            },
            {
                $lookup: {
                    from: "cvs",
                    localField: "_id",
                    foreignField: "idUser",
                    as: "user_cv"
                }
            },
            { $unwind: "$user_cv" },
            {
                $lookup: {
                    from: "applications",
                    localField: "user_cv._id",
                    foreignField: "cvId",
                    as: "apply"
                }
            },
            { $unwind: "$apply" },
            {
                $lookup: {
                    from: "posts",
                    localField: "apply.postId",
                    foreignField: "_id",
                    as: "post"
                }
            },
            { $unwind: "$post" },
            {
                $lookup: {
                    from: "cos",
                    localField: "post.CO",
                    foreignField: "_id",
                    as: "CO"
                }
            },
            { $unwind: "$CO" },           
            {
              $addFields: {
                  "post.CO": "$CO" // Gán thông tin CO vào post
              }
          },
            { 
                $sort: { "apply.createdAt": -1 } // Sắp xếp theo ngày apply (mới nhất trước)
            }
        ];

        // Đếm tổng số bản ghi trước khi phân trang
        const totalItemsResult = await userModel.aggregate([...queryPipeline, { $count: "total" }]);
        const totalItems = totalItemsResult.length > 0 ? totalItemsResult[0].total : 0;

        // Nếu có phân trang thì thêm $skip và $limit
        if (limit) {
            queryPipeline.push({ $skip: skip }, { $limit: limit });
        }

        const result = await userModel.aggregate(queryPipeline);

        return res.status(200).json({
            success: true,
            data: result,
            totalItems: totalItems,
            totalPages: limit ? Math.ceil(totalItems / limit) : 1,
            currentPage: page
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

}

module.exports = ApplicationsController;