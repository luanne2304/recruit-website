
const COModel = require("../Models/COModel");
const {ref,uploadBytesResumable,getDownloadURL} =require("firebase/storage")
const {v4} =require("uuid")
const { auth,storage } = require('../config/index')



const COController = {
  
  create: async (req, res, next) => {
    try {
      const {nameCO,desCO,linkCO,staffto,stafffrom,taxcode,iDusermanager }= req.body
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
        const imgref = await ref(storage,`logos/${file.filename}.${v4()}`)
        const snapshot =await uploadBytesResumable(imgref, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const newCO = new COModel({
          name: nameCO,
          logo: downloadURL,
          des: desCO,
          scaleto: staffto,
          scalefrom: stafffrom,
          link: linkCO,
          taxcode: taxcode,
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
}

module.exports = COController;