const userModel = require("../Models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const client = require("../config/redisClient");

const authController = {
  test: async (req, res)=> {

    res.status(200).json(
      "hihi"
    );
  },


  generateAuthToken :  (user) => {
    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin,}, process.env.JWT_KEY,{ expiresIn: "5s" });
    
    return token;
  },

  generateRefreshToken :  (user) => {
    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin,}, process.env.JWT_REFRESH_KEY,{ expiresIn: "30s" });
    
    return token;
  },

  saveRefreshToken : async (userId, refreshToken, ttl = 86400) => { 
    const key = `refreshToken:${userId}:${refreshToken}`;
    client.SETEX(key, ttl, "valid", (err, reply) => {
        if (err) {
            console.error("Error saving refresh token:", err);
        } else {
            console.log("Refresh token saved:", reply);
        }
    });
  },

  verifyRefreshToken : async (userId,refreshToken) => {
    const key = `refreshToken:${userId}:${refreshToken}`;
    client.get(key, (err, reply) => {
        if (err) {
            console.error("Error verifying refresh token:", err);
            return false
        } else if (!reply) {
            return false
        } else {
            return true
        }
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

  // requestRefreshToken: async (req, res) => {
  //   try{
  //   const refreshToken = req.cookies.refreshToken;
    
   
  //   jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     authController.verifyRefreshToken(user._id,refreshToken);
  //     const newAccessToken = authController.generateAccessToken(user);
  //     const newRefreshToken = authController.generateRefreshToken(user);
  //     if(!authController.verifyRefreshToken(refreshToken))
  //     {
  //       res.status(403).json(
  //         "Your token is Invalid or expired "
  //       );
  //     }
  //     res.cookie("refreshToken", refreshToken, {
  //       httpOnly: true,
  //       secure:false,
  //       path: "/",
  //       sameSite: "strict",
  //     });
  //     res.status(200).json({
  //       accessToken: newAccessToken,
  //       refreshToken: newRefreshToken,
  //     });
  //   });
  //   }catch(error){
  //     res.status(403).json(
  //       "Your token is Invalid or expired "
  //     );
  //   }
  // },


  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect',
        });
      }
      const accessToken = await authController.generateAuthToken(user);
      const refreshToken = await authController.generateRefreshToken(user);
      authController.saveRefreshToken(user._id,refreshToken)
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
      const accessToken = await authController.generateAuthToken(newUser);
      const refreshToken = await authController.generateRefreshToken(newUser);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      authController.saveRefreshToken(newUser._id,refreshToken)
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
        const accessToken = await authController.generateAuthToken(existingUser);
        const refreshToken = await authController.generateRefreshToken(existingUser);
        authController.saveRefreshToken(existingUser._id,refreshToken)
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
      const accessToken = await authController.generateAuthToken(createuser);
      const refreshToken = await authController.generateRefreshToken(createuser);
      authController.saveRefreshToken(createuser._id,refreshToken)
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
};

module.exports = authController;