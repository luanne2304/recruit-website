
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    idpost:{ type: mongoose.Schema.Types.ObjectId, required: true, ref:"posts"},
    description: {type: String, required: true},
    from: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"users"},
    status: {type: String, required: true, default: 'pending'}
},{
    timestamps: true,
  }
);

const reportModel = mongoose.model('reports', reportSchema);

module.exports= reportModel;

