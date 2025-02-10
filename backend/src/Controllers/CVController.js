
const CVModel = require("../Models/CVModel");
const {ref,uploadBytesResumable,getDownloadURL,deleteObject } =require("firebase/storage")
const {v4} =require("uuid")
const { auth,storage } = require('../config/index')


const CVController = {
    uploadCV:  async (req, res, next) => {
        try {
          const id = req.user._id;
          const { filetitle } = req.body

        // Kiểm tra số lượng CV của người dùng
        const cvCount = await CVModel.countDocuments({ idUser: id });
        if (cvCount >= 5) {
            return res.status(400).json({
                success: false,
                message: "Bạn đã đạt giới hạn tối đa 5 CV, không thể upload thêm.",
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
          const pdfref = await ref(storage,`CVs/${file.filename}.${v4()}`)
          const snapshot =await uploadBytesResumable(pdfref, file.buffer, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);
          const newCV = {
            idUser:id,
            linkfile: downloadURL,
            filetitle: filetitle,
          };
          const updatedUser = await CVModel.create(newCV)
          return res.status(200).json({
              success: true,
              data: updatedUser,
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: error.message,
          });
      }
    },
    getCVByIduser: async (req, res, next) => {
      try {
        const id = req.user._id;
        const getCV = await CVModel.find({idUser:id});
          return res.status(200).json({
              success: true,
              data: getCV,
          });
      } catch (error) {
        console.log(error);
          return res.status(500).json({
              success: false,
              message: error.message,
          });
          
      }
    },
    deleteCV: async (req, res, next) => {
      try {
        const cvId = req.params.id; // Lấy ID của CV cần xóa
        const userId = req.user._id; // Lấy ID người dùng
          const cv = await CVModel.findOne({ _id: cvId, idUser: userId });
          if (!cv) {
              return res.status(404).json({
                  success: false,
                  message: "CV không tồn tại hoặc bạn không có quyền xóa.",
              });
          }

          // Lấy link file từ CV
          const fileUrl = cv.linkfile;
          if (!fileUrl) {
              return res.status(400).json({
                  success: false,
                  message: "Không tìm thấy file để xóa.",
              });
          }

          // Lấy đường dẫn file trong Firebase Storage
          const filePath = fileUrl.split("CVs%2F")[1].split("?alt=")[0]; // Lấy tên file
          const fileRef = ref(storage, `CVs/${decodeURIComponent(filePath)}`); // Giải mã tên file

          // Xóa file trên Firebase Storage
          await deleteObject(fileRef);

          // Xóa CV trong database
          await CVModel.deleteOne({ _id: cvId });

          return res.status(200).json({
              success: true,
              message: "CV đã được xóa thành công.",
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: error.message,
          });
      }
    },
}

module.exports = CVController;