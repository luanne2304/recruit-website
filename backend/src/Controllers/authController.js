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
    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin,status:user.status}, process.env.JWT_KEY,{ expiresIn: "1d" });
    
    return token;
  },

  generateRefreshToken :  (user) => {
     const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin,status:user.status}, process.env.JWT_REFRESH_KEY,{ expiresIn: "1d" });
    
    return token;
  },

  saveRefreshToken :  (userId, refreshToken, ttl = 86400) => { 
    const key = `refreshToken:${userId}:${refreshToken}`;
     client.SETEX(key, ttl, "valid", (err, reply) => {
        if (err) {
            console.error("Error saving refresh token:", err);
        } else {
            console.log("Refresh token saved:", reply);
        }
    });
  },

  verifyRefreshToken :async (userId,refreshToken) => {
    try {
    const key = `refreshToken:${userId}:${refreshToken}`;
    const reply = await client.GET(key); // Dùng await trực tiếp

    return !!reply;
  } catch (err) {
    console.error(" Error verifying refresh token:", err);
    return false;
  }
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

  requestRefreshToken: async (req, res) => {
    try{
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY,async (err, user) => {
      if (err) {
        console.log(err);
      }
      const isValidToken =await authController.verifyRefreshToken(user._id, refreshToken);
      if (!isValidToken) {
        return res.status(401).json({ message: "Your token is invalid or expired" });
      }
      const checkuser = await userModel.findById(user._id);
      const newAccessToken = authController.generateAuthToken(checkuser);
      res.status(200).json({
        accessToken: newAccessToken,
      });
    });
    }catch(error){
      res.status(401).json(
        "Your token is Invalid or expired "
      );
    }
  },


  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect',
        });
      }
      const accessToken =  authController.generateAuthToken(user);
      const refreshToken =  authController.generateRefreshToken(user);
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
        accessToken: accessToken
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
        const accessToken =  authController.generateAuthToken(existingUser);
        const refreshToken =  authController.generateRefreshToken(existingUser);
        authController.saveRefreshToken(existingUser._id,refreshToken)
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
  
        return res.status(200).json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
      }
      const createuser = await userModel.create({ fullName: displayName,email: email,avatar:photoURL});
      const accessToken =  authController.generateAuthToken(createuser);
      const refreshToken =  authController.generateRefreshToken(createuser);
      await authController.saveRefreshToken(createuser._id,refreshToken)
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
        authController.revokeRefreshToken( req.user._id,req.cookies.refreshToken)
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;