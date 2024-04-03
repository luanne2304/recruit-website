const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String},
    sdt: { type: String },
    avatar: { type: String },
    isAdmin:  { type: Boolean, default: false },
  }
);
const user = mongoose.model("users", userSchema);

export default user;