const userModel = require("../Models/userModel");

const userController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checklogin = await userModel.find({ email: email, password: password });
      if (checklogin == "") {
        return res.status(404).json({
          success: true,
          data: checklogin,
        });
      }
      return res.status(200).json({
        success: true,
        data: checklogin,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  signup: async  (req, res, next) => {
    try {
      const { username,email, password} = req.body;
      const createuser = await userModel.create({ username: username,email: email, password: password });
      return res.status(200).json({
        success: true,
        data: createuser,
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
        return res.status(200).json({
            success: true,
        });
      }
      const createuser = await userModel.create({ username: displayName,email: email,avatar:photoURL});
      return res.status(200).json({
        success: true,
        data: createuser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = userController;
