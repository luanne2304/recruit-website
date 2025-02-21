const mongoose = require("mongoose");

const CVsSchema = new mongoose.Schema(
    {
    idUser:{ type: mongoose.Schema.Types.ObjectId, required: true ,ref: "users"},
    filetitle: { type: String, required: true},
    linkfile:  { type: String, required: true },
    status:  { type: Boolean, required: true ,default:true},
  }
);
const CVsModel = mongoose.model("CVs", CVsSchema);

module.exports = CVsModel;