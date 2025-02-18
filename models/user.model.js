import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // schema validation
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
