const mongoose = require("mongoose");

const COSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    coverimg: { type: String},
    des: { type: String, required: true },
    scaleto: { type: Number , required: true},
    scalefrom: { type: Number , required: true},
    address: [{ 
        city: { type: String, required: true },
        city_code: { type: Number, required: true },
        district: { type: String, required: true },
        district_code: { type: Number, required: true },
        ward: { type: String, required: true },
        ward_code: { type: Number, required: true },
        streetnumber: { type: String, required: true },
     }],
    link: { type: String , required: true},
    taxcode: { type: Number, required: true },
    idaccount_manager:  { type: String, required: true },
    status:{ type: Boolean , default: true},
  },{
    timestamps: true,
  }
);
const COModel = mongoose.model("COs", COSchema);

module.exports = COModel;