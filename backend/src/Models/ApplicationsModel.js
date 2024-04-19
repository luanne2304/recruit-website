const mongoose = require("mongoose");

const ApplicationsSchema = new mongoose.Schema(
    {
    cvId: { type: String, required: true },
    postId: { type: String, required: true },
    status: { type: String, default:"pending"},
  },{
    timestamps: true,
  }
);
const ApplicationsModel = mongoose.model("applications", ApplicationsSchema);

module.exports = ApplicationsModel;