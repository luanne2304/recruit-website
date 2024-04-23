const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    des: { type: String, required: true },
    require: { type: String , required: true},
    benefit: { type: String , required: true},
    address: { type: String, required: true},
    form: { type: String , required: true},
    salaryto: { type: Number},
    salaryfrom: { type: Number},
    duration: {type: Date, required: true},
    tag: {
      skill: [{ type: String , required: true}],
      exp: [{ type: String , required: true }]
    },
    status: { type: Boolean, default:true},
    CO:{ type: mongoose.Schema.Types.ObjectId, ref:"COs"}
  },{
    timestamps: true,
  }
);
const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;