
const COModel = require("../Models/COModel");
const {ref,uploadBytesResumable,getDownloadURL} =require("firebase/storage")
const {v4} =require("uuid")
const { auth,storage } = require('../config/index')
const logAudit = require("../middleware/auditLog");



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
        await logAudit(req, 'CREATE', 'COs', [createCO._id], null, createCO, "Tạo công ty");
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

  update: async (req, res, next) => {
    try {
      const iduser= req.user._id;
      const idCO= req.params.idCO;
      const {nameCO,desCO,linkCO,scaleto,scalefrom,listaddress }= req.body
      let coverimg;
      if (!idCO) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu idCO, không thể cập nhật công ty.',
        });
      }
  
      // Tìm công ty trong database
      const existingCO = await COModel.find({_id:idCO,idaccount_manager:iduser});
      if (!existingCO) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy công ty.',
        });
      }
      if (req.file) {
        const file = {
          type: req.file.mimetype,
          buffer: req.file.buffer,
          filename: req.file.originalname,
        }
        const metadata = {
          contentType: file.type,
        }
        const imgref =  ref(storage,`logos/${file.filename}.${v4()}`)
        const snapshot =await uploadBytesResumable(imgref, file.buffer, metadata);
        coverimg = await getDownloadURL(snapshot.ref);
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
        const updatedCO = await COModel.findByIdAndUpdate(
          idCO,
          {
            name: nameCO,
            coverimg: coverimg,
            des: desCO,
            scaleto,
            scalefrom,
            link: linkCO,
            address: formatListaddress,
          },
          { new: true } // Trả về bản ghi mới sau khi cập nhật
        );
      await logAudit(req, 'UPDATE', 'COs', [idCO], {...existingCO._doc}, updatedCO, "Cập nhật thông tin công ty");
      return res.status(200).json({
        success: true,
        data:updatedCO
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateCoverImg: async (req, res, next) => {
    try {
      const iduser= req.user._id;
      const idCO= req.params.idCO;
      console.log(idCO)
      if (!idCO) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu idCO, không thể cập nhật công ty.',
        });
      }
  
      // Tìm công ty trong database
      const existingCO = await COModel.find({_id:idCO,idaccount_manager:iduser});
      if (!existingCO) {
        return res.status(403).json({
          success: false,
          message: 'ko du quyen han',
        });
      }

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
        const imgref =  ref(storage,`coverimg/${file.filename}.${v4()}`)
        const snapshot =await uploadBytesResumable(imgref, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const updatedCO = await COModel.findByIdAndUpdate(
          idCO,
          {
            coverimg: downloadURL,
          },
          { new: true } // Trả về bản ghi mới sau khi cập nhật
        );

      return res.status(200).json({
        success: true,
        data:updatedCO
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
      let { status ,reason} = req.body; // Lấy status mới từ request body
      if(status){
        reason="Mở hoạt động vì "+reason
      }
      else{
        reason="Khóa hoạt động vì "+reason
      }
      // Kiểm tra xem công ty có tồn tại không
      const existingCO = await COModel.findById(id);
      if (!existingCO) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy công ty",
        });
      }
  
      existingCO.status = status;
      await existingCO.save();

      await logAudit(req, 'UPDATE', 'COs', [id], null, null, reason);
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
      await logAudit(req, 'UPDATE', 'COs', [id], {idaccount_manager:existingCO.idaccount_manager}, { idaccount_manager }, "Cập nhật người quản lý công ty");
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