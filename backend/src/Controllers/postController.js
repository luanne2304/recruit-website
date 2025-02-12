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

      getFilterjob: async (req, res, next) => {
        try {
          let { city, salary, skill, exp, form, page, limit } = req.query;
          console.log(req.query)
          page = parseInt(page) 
          limit = parseInt(limit) 
          const currentDate = new Date();
      
          let query = {
            status: true,
            duration: { $gte: currentDate },
          };
      
          if (city && city !== "Tất cả mọi nơi") {
            if (city === "Khác") {
              query["address.city"] = { $nin: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"] };
            } else {
              query["address.city"] = city;
            }
          }
      
          if (salary && salary.length === 2) {
            query.$and = [
              { salaryfrom: { $lte: salary[1] } },
              { salaryto: { $gte: salary[0] } },
            ];
          }
      
          if (skill) {
            query["tag.skill"] = { $in: skill };
          }
      
          if (exp) {
            query["tag.exp"] = { $in: exp };
          }
      
          if (form) {
            query.form = { $in: form };
          }
      
          let getPostQuery = postModel.find(query).populate("CO").sort({ createdAt: -1 });

          // 🔥 Nếu có page và limit thì phân trang
          if (!isNaN(page) && !isNaN(limit)) {
            getPostQuery = getPostQuery.skip((page - 1) * limit).limit(limit);
          }
      
          const getPost = await getPostQuery;
          const totalItems = await postModel.countDocuments(query);
          const totalPages = limit ? Math.ceil(totalItems / limit) : 1;
      
          return res.status(200).json({
            success: true,
            data: getPost,
            totalPages: totalPages,
            totalItems: totalItems,
            currentPage: page,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      },

      getSearchjob: async (req, res, next) => {
        try {
          console.log(req.query)
          let { search, page, limit } = req.query;
          console.log(search+"a")
          page = parseInt(page) 
          limit = parseInt(limit) 
          const currentDate = new Date();
      
          let query = {
            status: true,
            duration: { $gte: currentDate },
          };

          if (search) {
            query.$or = [
              { title: { $regex: search, $options: "i" } }, // Tìm theo tên bài đăng
              { "CO.name": { $regex: search, $options: "i" } }, // Tìm theo tên công ty
              { "tag.skill": { $regex: search, $options: "i" } }, // Tìm theo kỹ năng
            ];
          }
      
          let getPostQuery = postModel.find(query).populate("CO").sort({ createdAt: -1 });

          // 🔥 Nếu có page và limit thì phân trang
          if (!isNaN(page) && !isNaN(limit)) {
            getPostQuery = getPostQuery.skip((page - 1) * limit).limit(limit);
          }
      
          const getPost = await getPostQuery;
          const totalItems = await postModel.countDocuments(query);
          const totalPages = limit ? Math.ceil(totalItems / limit) : 1;

          return res.status(200).json({
            success: true,
            data: getPost,
            totalPages: totalPages
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
