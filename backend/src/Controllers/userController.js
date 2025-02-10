
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");
const {ref,uploadBytesResumable,getDownloadURL,deleteObject } =require("firebase/storage")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {v4} =require("uuid");
const redis = require("redis");
const client = redis.createClient();
const { auth,storage } = require('../config/index')

const userController = {
  
  grantPermission: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateUser = await userModel.findByIdAndUpdate( id, { isAdmin: true }, { new: true });
      return res.status(200).json({
        success: true,
        data: updateUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },


  getAllUser: async (req, res, next) => {
    try {
        const getUser = await userModel.find({});
        return res.status(200).json({
            success: true,
            data: getUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
},

getUserById: async (req, res, next) => {
    try {
      const id = req.user._id;
      const getUser = await userModel.findById(id);
        
        return res.status(200).json({
            success: true,
            data: getUser,
        });
    } catch (error) {
      console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
},

updateStatusMultipleUser: async (req, res, next) => {
  try {
    const { ids, status,reason } = req.body; 

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Danh sách acc ko hợp lệ",
      });
    }

     await userModel.updateMany(
      { _id: { $in: ids } }, 
      { $set: { status } } 
    );
    return res.status(200).json({
      success: true,
      message: `Cập nhật trạng thái thành công `,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
},

resetPassword: async (req, res, next) => {
  try {
      const id=req.user._id
      const { oldPassword, newPassword } = req.body;
      console.log(id,req.body)
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User không tồn tại!" });
      }
      console.log(user.password)
      if (user.password)
      {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: "Mật khẩu cũ không đúng!" });
      }
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({
          success: true,
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message,
      });
  }
},

updateUser: async (req, res, next) => {
  try {
      const id = req.user._id;
      const {fullName,phone} = req.body;

      let user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User không tồn tại!" });
      }
      let avatarPath = user.avatar; // Mặc định giữ nguyên avatar cũ
      if (req.file) { // Nếu có file avatar mới được upload
        const file = {
          type: req.file.mimetype,
          buffer: req.file.buffer,
          filename: req.file.originalname,
        }
        const metadata = {
          contentType: file.type,
        }
        const imgref =  ref(storage,`avatar/${v4()}_${file.filename}`)
        const snapshot =await uploadBytesResumable(imgref, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        avatarPath = downloadURL

        if (user.avatar && user.avatar.includes("firebasestorage.googleapis.com")) {
          try {
            // Tách path file từ URL
            const oldAvatarPath = decodeURIComponent(user.avatar.split("/o/")[1].split("?")[0]);
            const oldAvatarRef = ref(storage, oldAvatarPath);
            await deleteObject(oldAvatarRef);
            console.log(" Ảnh cũ đã bị xóa khỏi Firebase");
          } catch (err) {
            console.error(" Lỗi khi xóa ảnh cũ:", err.message);
          }
        }
      }
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { fullName, sdt:phone, avatar: avatarPath },
        { new: true, runValidators: true } 
      );
      return res.status(200).json({
          success: true,
          data: updatedUser,

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
    const  { iduser } = req.query

    const result = await userModel.aggregate([
      {
        $match: {
          "_id": new mongoose.Types.ObjectId(iduser)
        }
      },
      {
        $lookup: {
          from: "cvs",
          localField: "_id",
          foreignField: "idUser",
          as: "user_cv"
        }
      },
      {
        $unwind: "$user_cv"
      },
      {
        $lookup: {
          from: "applications",
          localField: "user_cv._id",
          foreignField: "cvId",
          as: "apply"
        }
      },
      {
        $unwind: "$apply"
      },
      {
        $lookup: {
          from: "posts",
          localField: "apply.postId",
          foreignField: "_id",
          as: "post"
        }
      },
      {
        $unwind: "$post"
      },  
      {
        $lookup: {
          from: "cos",
          localField: "post.CO",
          foreignField: "_id",
          as: "co_info"
        }
      },
      {
        $unwind:"$co_info"
      },
      {
        $sort: {
          "apply.createdAt": -1 // Sắp xếp theo createdAt, -1 là giảm dần (tức là mới nhất đến cũ nhất)
        }
      }
    ])
    const populatedResult = await userModel.populate(result, {
      path: "post.CO", // Đường dẫn tới trường coId trong posts
      model: "COs" // Tên của model CO
    });
    return res.status(200).json({
      success: true,
      data:populatedResult
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

};

module.exports = userController;
