const postModel = require("../Models/postModel");
const COModel = require("../Models/COModel");

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
          const getPost = await postModel.find({status:true, duration: { $gte: currentDate }}).populate('CO').sort({ createdAt: -1 });
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

      getALLJobbyCO: async  (req, res, next) => {
        try {
          const id = req.params.id
          const currentDate =new Date()           
          const getPost = await postModel.find({status:true, CO:id, duration: { $gte: currentDate }}).populate('CO').sort({ createdAt: -1 });
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

      getFilterjob: async  (req, res, next) => {
        try {
          const { city, salary, skill, exp, form } = req.query;
          const currentDate =new Date()  

          const getPost = await postModel.find({status:true, duration: { $gte: currentDate }}).populate('CO').sort({ createdAt: -1 });
          const filteredPosts = getPost.filter(post => { 
            let cityFilter;
            if (city === "Tất cả mọi nơi") {
              cityFilter = true; 
            } else if (city === "Khác") {
              cityFilter = !["Hồ Chí Minh", "Hà Nội","Đà Nẵng"].includes(post.address.city);
            } else {
              cityFilter = post.address.city === city;
            }         
            const salaryFilter = post.salaryfrom <= salary[1] && salary[0] <= post.salaryto 
            const skillFilter = skill===undefined|| skill.some(s => post.tag.skill.includes(s)) 
            const expFilter = exp===undefined|| exp.some(s => post.tag.exp.includes(s))
            const formFilter = form===undefined|| form.some(f => post.form.includes(f))
            return salaryFilter && skillFilter && expFilter && formFilter  && cityFilter

          });

          return res.status(200).json({
            success: true,
            data: filteredPosts,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      },

      getDetailjob: async  (req, res, next) => {
        try {
          const id = req.params.id;
          const getPostbyID = await postModel.findById(id).populate("CO")
          return res.status(200).json({
            success: true,
            data: getPostbyID,
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
