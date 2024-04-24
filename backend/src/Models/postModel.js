const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    des: { type: String, required: true },
    require: { type: String , required: true},
    benefit: { type: String , required: true},
    form: { type: String, required: true},
    address: {
        city: { type: String, required: true },
        city_code: { type: Number, required: true },
        district: { type: String, required: true },
        district_code: { type: Number, required: true },
        ward: { type: String, required: true },
        ward_code: { type: Number, required: true },
        streetnumber: { type: String, required: true },
    },
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