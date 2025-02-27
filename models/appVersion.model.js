import mongoose from "mongoose";

const appVersionSchema = new mongoose.Schema(
  {
    version: { type: String, required: true },
    forceUpdate: { type: Boolean, default: false },
    description: { type: String, default: "Bug Fixed..." },
    updateAvailable:{type:Boolean,default:false},
  },
  { timestamps: true }
);

const Version = mongoose.model("Version", appVersionSchema);

export default Version;
