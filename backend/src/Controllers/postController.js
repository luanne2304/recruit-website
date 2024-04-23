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
          const getPost = await postModel.find({status:true, duration: { $gte: currentDate }}).sort({ createdAt: -1 });
          const temp=[]

          await Promise.all(getPost.map(async (i) => {
            const CO = await COModel.findById(i.CO);
            var a=i._doc
            const nameCO = CO ? CO.name : null;
            const logoCO = CO ? CO.logo : null;
            a={...a,nameCO:nameCO,logoCO:logoCO}
            temp.push(a);
          }));

          return res.status(200).json({
            success: true,
            data: temp,
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
          console.log(city,salary,skill,exp,form)

          const currentDate =new Date()  

          const getPost = await postModel.find({status:true, duration: { $gte: currentDate }}).sort({ createdAt: -1 });
          const getPost2 = await postModel.find().populate('CO');
          console.log(getPost2)
          // const filteredPosts = getPost.filter(post => {
            
          //   // let cityFilter;
          //   // if (city === "ALL") {
          //   //   cityFilter = true; 
          //   // } else if (city === "Others") {
          //   //   cityFilter = !["Hồ Chí Minh", "Hà Nội","Đà Nẵng"].includes(post.city);
          //   // } else {
          //   //   cityFilter = post.city === city;
          //   // }
          
          //   const salaryFilter = post.salaryfrom <= salary[1] && salary[0] <= post.salaryto 
          //   const skillFilter = skill===undefined|| skill.some(s => post.tag.skill.includes(s)) 
          //   const expFilter = exp===undefined|| exp.some(s => post.tag.exp.includes(s))
          //   const formFilter = form===undefined|| form.some(f => post.form.includes(f))
          //   return salaryFilter && skillFilter && expFilter && formFilter 
          //   // &&cityFilter
          // });

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

      getDetailjob: async  (req, res, next) => {
        try {
          const id = req.params.id;
          const getPostbyID = await postModel.findById(id)
          const getCObyID = await COModel.findById(getPostbyID.CO)
          return res.status(200).json({
            success: true,
            post: getPostbyID,
            co: getCObyID
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
