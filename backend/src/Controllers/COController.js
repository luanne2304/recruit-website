
const COModel = require("../Models/COModel");
const {ref,uploadBytesResumable,getDownloadURL} =require("firebase/storage")
const {v4} =require("uuid")
const { auth,storage } = require('../config/index')



const COController = {
  
  create: async (req, res, next) => {
    try {
      const {nameCO,desCO,linkCO,scaleto,scalefrom,taxcode,iDusermanager,listaddress }= req.body
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded.',
        });
      }  
        const file = {
          type: req.file.mimetype,
          buffer: req.file.buffer,
          filename: req.file.originalname,
        }
        const metadata = {
          contentType: file.type,
        }
        const formatListaddress=[]
        const temp = JSON.parse(listaddress)
        temp.map((i)=>{
        formatListaddress.push({
          city:i.city.label,
          city_code:i.city.code,
          district:i.district.label,
          district_code:i.district.code,
          ward:i.ward.label,
          ward_code:i.ward.code,
          streetnumber:i.streetnumber,
        })
      })
        const imgref =  ref(storage,`logos/${file.filename}.${v4()}`)
        const snapshot =await uploadBytesResumable(imgref, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const newCO = new COModel({
          name: nameCO,
          logo: downloadURL,
          des: desCO,
          scaleto: scaleto,
          scalefrom: scalefrom,
          link: linkCO,
          taxcode: taxcode,
          idaccount_manager:iDusermanager,
          address:formatListaddress
        })
        const createCO = await COModel.create(newCO);
      return res.status(200).json({
        success: true,
        data:createCO
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAll: async (req, res, next) => {
    try {
      let { search, page, limit } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
  
      let query = {};
  
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
        ];
        if (!isNaN(search)) {
          query.$or.push({ taxcode: parseInt(search) });
        }
      }
  
      let getCOQuery = COModel.find(query).sort({ createdAt: -1 });
  
      if (!isNaN(page) && !isNaN(limit)) {
        getCOQuery = getCOQuery.skip((page - 1) * limit).limit(limit);
      }
  
      const getCO = await getCOQuery;
      const totalItems = await COModel.countDocuments(query);
      const totalPages = limit ? Math.ceil(totalItems / limit) : 1;
  
      return res.status(200).json({
        success: true,
        data: getCO,
        totalPages: totalPages,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getCObyID: async  (req, res, next) => {
    try {
      const id =req.params.id
      const getCO = await COModel.findById(id)
      return res.status(200).json({
        success: true,
        data: getCO,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getCObyIDuser: async  (req, res, next) => {
    try {
      const id =req.user._id
      const getCO = await COModel.findOne({idaccount_manager:id})
      if(!getCO){
        return res.status(404).json("ko co Congty");
      }
      return res.status(200).json({
        success: true,
        data: getCO,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { id } = req.params; // Lấy ID công ty từ URL
      const { status ,reason} = req.body; // Lấy status mới từ request body
  
      // Kiểm tra xem công ty có tồn tại không
      const existingCO = await COModel.findById(id);
      if (!existingCO) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy công ty",
        });
      }
  
      // Cập nhật status
      existingCO.status = status;
      await existingCO.save();
      console.log(req.body)
      return res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thành công",
        data: existingCO,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateIdaccountCO: async (req, res, next) => {
    try {
      const { id } = req.params; // Lấy ID công ty từ URL
      const { idaccount_manager } = req.body; // Lấy dữ liệu mới từ request body

      // Kiểm tra xem công ty có tồn tại không
      const existingCO = await COModel.findById(id);
      if (!existingCO) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy công ty",
        });
      }

      existingCO.idaccount_manager = idaccount_manager;

      await existingCO.save();
      
      return res.status(200).json({
        success: true,
        message: "Cập nhật thành công",
        data: existingCO,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
}

module.exports = COController;