
const CVModel = require("../Models/CVModel");
const {ref,uploadBytesResumable,getDownloadURL} =require("firebase/storage")
const {v4} =require("uuid")
const { auth,storage } = require('../config/index')


const CVController = {
    uploadCV:  async (req, res, next) => {
        try {
          const id = req.params.id;
          const { filetitle } = req.body
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
      }
}

module.exports = CVController;