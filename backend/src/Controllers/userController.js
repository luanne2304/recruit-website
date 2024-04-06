const userModel = require("../Models/userModel");

const userController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email, password });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
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

      const newUser = await userModel.create({ fullName, email, password });

      return res.status(200).json({
        success: true,
        data: newUser,
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
        const getUser = await UserModel.find({});
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
        const { id } = req.params;
        const getUser = await UserModel.findById(id);
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

// delete = update status to disable
deleteUser: async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteUser = await UserModel.findByIdAndUpdate(
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
      const resetPassword = await UserModel.findByIdAndUpdate( id, { password : newPassword }, { new: true });
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


};

module.exports = userController;
