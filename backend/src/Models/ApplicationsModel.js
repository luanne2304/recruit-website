const mongoose = require("mongoose");

const ApplicationsSchema = new mongoose.Schema(
    {
    cvId: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "CVs" },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true ,ref: "posts",},
    status: { type: String, default:"pending"},
  },{
    timestamps: true,
  }
);
const ApplicationsModel = mongoose.model("applications", ApplicationsSchema);

module.exports = ApplicationsModel;