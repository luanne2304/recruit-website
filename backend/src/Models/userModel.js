const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    sdt: { type: String, default: ''},
    avatar: { type: String , default: ''},
    isAdmin:  { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, required: true, default: 'enable' },
  }
);
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;