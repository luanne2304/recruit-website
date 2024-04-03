const postModel = require("../Models/postModel");

const postController = {
    create: async  (req, res, next) => {
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

module.exports = postController;
