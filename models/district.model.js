import mongoose from "mongoose";

const beatSchema = new mongoose.Schema(
  {
    beatName: { type: String, required: true, trim: true },
    area: { type: String, default: "" },
  },
  { _id: true }
);

const districtSchema = new mongoose.Schema(
  {
    districtName: { type: String, required: true, trim: true },
    state: { type: String, trim: true,default:"" },
    country: { type: String, trim: true, default: "India" },
    beat: { type: [beatSchema], default: [] },
  },
  { timestamps: true }
);

const District = mongoose.model("District", districtSchema);

export default District;
