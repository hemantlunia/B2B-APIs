import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {ApiError} from "../utils/ApiError.js"

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobileNo: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    userRole: {
      type: String,
      required: true,
      enum: ["Admin", "User", "Dispatcher"],
    },
    isActive: { type: Boolean, default: true },
    isAllowProduct: { type: Boolean, default: false },
    headQuatersName: { type: String, trim: true },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    // p Address
    pState: { type: String ,trim:true },
    pDistrict: { type: String,trim:true  },
    pAddress: { type: String ,trim:true },
    pPinCode: { type: String ,trim:true },

    // c Address
    cState: { type: String,trim:true },
    cDistrict: { type: String ,trim:true },
    cAddress: { type: String,trim:true },
    cPinCode: { type: String ,trim:true },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      default:null,
    },
    dob: { type: String, trim:true },
    secMobileNo: { type: String, trim: true },
    highQualification: { type: String, trim: true },

    aadharNo: { type: String },
    panCard: { type: String },
    drivingLicence: { type: String},
    esiAccount: { type: String },
    uan: { type: String },

    bankAccountNumber: { type: String, trim: true },
    bankName: { type: String, trim: true },
    ifsc: { type: String, trim: true },
    micrCode: { type: String, trim: true },
    branchEmail: { type: String, trim: true },
    branchAddress: { type: String, trim: true },

    beat: { type: String, trim: true },
  },
  { timestamps: true }
);

// preMiddleware for hashing the Password
userSchema.pre("save",async function(next){
  if (!this.isModified("password")) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(new ApiError(500,"Error while hasing the password"))
  }
})

const UserDetail = mongoose.model("UserDetail", userSchema);

export default UserDetail;
