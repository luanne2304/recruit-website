
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");
const {ref,uploadBytesResumable,getDownloadURL} =require("firebase/storage")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {v4} =require("uuid");
const redis = require("redis");
const client = redis.createClient();
const { auth,storage } = require('../config/index')

const userController = {
  generateAuthToken : async (user) => {
    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin,}, process.env.JWT_KEY,{ expiresIn: "10s" });
    
    return token;
  },

  generateRefreshToken : async (user) => {
    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin,}, process.env.JWT_REFRESH_KEY,{ expiresIn: "7d" });
    
    return token;
  },

  saveRefreshToken : async (userId, refreshToken, ttl = 604800) => { // TTL mặc định: 7 ngày
    const key = `refreshToken:${userId}:${refreshToken}`;
    client.SETEX(key, ttl, "valid", (err, reply) => {
        if (err) {
            console.error("Error saving refresh token:", err);
        } else {
            console.log("Refresh token saved:", reply);
        }
    });
  },

  verifyRefreshToken : async (refreshToken) => {
    return new Promise((resolve, reject) => {
      const key = `refreshToken:${userId}:${refreshToken}`;
      client.get(key, (err, reply) => {
          if (err) {
              console.error("Error verifying refresh token:", err);
              reject("Internal server error");
          } else if (!reply) {
              reject("Invalid or expired refresh token");
          } else {
              resolve("Valid refresh token");
          }
      });
  });
  },

  revokeRefreshToken : async (userId, refreshToken) => {
    const key = `refreshToken:${userId}:${refreshToken}`;
    client.del(key, (err, reply) => {
        if (err) {
            console.error("Error revoking refresh token:", err);
        } else {
            console.log("Refresh token revoked:", reply);
        }
    });
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      const user = await userModel.findOne({ email, hashedpassword });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      
      const accessToken = await userController.generateAuthToken(user);
      const refreshToken = await userController.generateRefreshToken(user);
      userController.saveRefreshToken(user._id,refreshToken)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        success: true,
        data: user,
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  signup: async (req, res, next) => {
    try {
      const { fullName, email, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newUser = await userModel.create({ fullName, email, password: hashed });
      const accessToken = await userController.generateAuthToken(newUser);
      const refreshToken = await userController.generateRefreshToken(newUser);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      userController.saveRefreshToken(newUser._id,refreshToken)
      return res.status(200).json({
        success: true,
        data: newUser,
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  signinnwithGmail: async  (req, res, next) => {
    try {
      const { displayName, email, photoURL} = req.body;
      const existingUser = await userModel.findOne({ email: email });
      if(existingUser){
        const accessToken = await userController.generateAuthToken(existingUser);
        const refreshToken = await userController.generateRefreshToken(existingUser);
        userController.saveRefreshToken(existingUser._id,refreshToken)
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
  
        return res.status(200).json({
            success: true,
            data: createuser,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
      }
      const createuser = await userModel.create({ username: displayName,email: email,avatar:photoURL});
      const accessToken = await userController.generateAuthToken(createuser);
      const refreshToken = await userController.generateRefreshToken(createuser);
      userController.saveRefreshToken(createuser._id,refreshToken)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json({
        success: true,
        data: createuser,
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  logout: async (req, res, next) => {
        revokeRefreshToken( req.user._id,req.cookies.refreshToken)
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
  },


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
      const id = req.params.id;
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

// delete = update status to disable
deleteUser: async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteUser = await userModel.findByIdAndUpdate(
            id,
            { status: 'disable' },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            data: deleteUser,
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
      const { id } = req.params;
      const newPassword = req.body.password;
      const resetPassword = await userModel.findByIdAndUpdate( id, { password : newPassword }, { new: true });
      return res.status(200).json({
          success: true,
          data: resetPassword,
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
      const id = req.params;
      const data = req.body;
      const updateUser = await userModel.findByIdAndUpdate( id, data, { new: true });
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
