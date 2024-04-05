const postModel = require("../Models/postModel");

const postController = {
    create: async  (req, res, next) => {
        try {
          const { title, des, require,benefit,address,form,salaryto,salaryfrom,duration,skill,exp,CO} = req.body;
          // const parsedSkill = JSON.parse(skill);
          // const parsedExp = JSON.parse(exp);
          const newPost = new postModel({
            title: title,
            des:des,
            require:require,
            benefit:benefit,
            address:address,
            form:form,
            salaryto:parseInt(salaryto),
            salaryfrom:parseInt(salaryfrom),
            duration:duration,
            tag: {
              skill:skill,
              exp:exp
            },
            CO:CO,
          })
          const createPost = await postModel.create(newPost);
          return res.status(200).json({
            success: true,
            data: createPost,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      },

      getALLjob: async  (req, res, next) => {
        try {
          const currentDate =new Date() 
          const getPost = await postModel.find({status:true, duration: { $gte: currentDate }}).sort({ createdAt: -1 });;
          return res.status(200).json({
            success: true,
            data: getPost,
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
