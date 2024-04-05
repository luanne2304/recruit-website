const mongoose = require("mongoose");

const COSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    des: { type: String, required: true },
    scaleto: { type: Number , required: true},
    scalefrom: { type: Number , required: true},
    address: [{ type: String , required: true}],
    link: { type: String , required: true},
    taxcode: { type: Number, required: true },
    idaccount_manager:  { type: Schema.Types.ObjectId, ref: 'users', required: true },
    status:{ type: Boolean , default: true},
  },{
    timestamps: true,
  }
);
const COModel = mongoose.model("CO", COSchema);

module.exports = COModel;