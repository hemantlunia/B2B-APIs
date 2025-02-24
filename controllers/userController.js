import UserDetail from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user registration... post
const userRegister = async (req, res, next) => {
  try {
    const { userName, email, mobileNo, password, userRole } = req.body;
    let missingFields = [];
    if (!userName) missingFields.push("userName");
    if (!email) missingFields.push("email");
    if (!mobileNo) missingFields.push("mobileNo");
    if (!password) missingFields.push("password");
    if (!userRole) missingFields.push("userRole");

    if (missingFields.length > 0) {
      return next(
        new ApiError(
          400,
          "Validations Failed",
          missingFields.map((field) => ({
            field,
            error: `${field} is Required...`,
          }))
        )
      );
    }

    const existingUser = await UserDetail.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, "Email already exists..."));
    }

    // saving fields in db
    const newUser = new UserDetail({
      userName,
      email,
      mobileNo,
      password,
      userRole,
      isActive: req.body.isActive ?? true,
      isAllowProduct: req.body.isAllowProduct ?? false,
      secMobileNo: req.body.secMobileNo || "",
      fatherName: req.body.fatherName || "",
      motherName: req.body.motherName || "",
      dob: req.body.dob || "",
      bloodGroup: req.body.bloodGroup || null,
      pAddress: req.body.pAddress || "",
      pDistrict: req.body.pDistrict || "",
      pState: req.body.pState || "",
      pPinCode: req.body.pPinCode || "",
      cAddress: req.body.cAddress || "",
      cDistrict: req.body.cDistrict || "",
      cState: req.body.cState || "",
      cPinCode: req.body.cPinCode || "",
      aadharNo: req.body.aadharNo || "",
      panCard: req.body.panCard || "",
      drivingLicence: req.body.drivingLicence || "",
      esiAccount: req.body.esiAccount || "",
      uan: req.body.uan || "",
      bankAccountNumber: req.body.bankAccountNumber || "",
      bankName: req.body.bankName || "",
      ifsc: req.body.ifsc || "",
      micrCode: req.body.micrCode || "",
      branchAddress: req.body.branchAddress || "",
      branchEmail: req.body.branchEmail || "",
      highQualification: req.body.highQualification || "",
      headQuatersName: req.body.headQuatersName || "",
      beat: req.body.beat || "",
    });

    await newUser.save();
    return res.json(
      new ApiResponse(
        201,
        {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          mobileNo: newUser.mobileNo,
          userRole: newUser.userRole,
          isActive: newUser.isActive,
          isAllowProduct: newUser.isAllowProduct,
          createdAt: newUser.createdAt,
        },
        "User Register Successfully..."
      )
    );
  } catch (error) {
    // console.log("errorrr", error);
    next(
      new ApiError(
        500,
        "Server Error: while registering user...",
        [error.message],
        error.stack
      )
    );
  }
};

// user update post
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (missingFields.length > 0) {
      return next(
        new ApiError(
          400,
          "Validations Failed",
          missingFields.map((field) => ({
            field,
            error: `${field} is Required...`,
          }))
        )
      );
    }
    // user checking...
    const existUser = await UserDetail.findOne({ email });
    if (!existUser) {
      return next(
        new ApiError(400, `User not exist with this Email : ${email}`)
      );
    }

    //   password checking
    const isPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!isPasswordMatch) {
      return next(
        new ApiError(400, `Please Check again your password : ${password}`)
      );
    }

    // generate the token
    const token = await jwt.sign(
      { id: existUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json(
      new ApiResponse(
        200,
        { token, user: existUser },
        "Login Successful..."
      )
    );
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));
  }
};

// update userDetails put
const userUpdate = async (req, res, next) => {
  try {
    // taking userid from params for dynamic
    const { userId } = req.params;
    // const userId = req.user.id; 
    
    const { oldPassword } = req.body;

    if (!userId) {
      return next(new ApiError(400, "userId is required!..."));
    };
    const existingUser = await UserDetail.findById(userId);
    if (!existingUser) {
      return next(new ApiError(400, "User not found..."));
    }

    if (!oldPassword) {
      return next(
        new ApiError(401, "Password is Required for verification...")
      );
    }
    const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isMatch) {
      return next(new ApiError(401, "Invalid Password..."));
    }

    // update fields
    const updateFields = {};
    const allowedFields = [
      "userName",
      "mobileNo",
      "password",
      "userRole",
      "isActive",
      "isAllowProduct",
      "secMobileNo",
      "fatherName",
      "motherName",
      "dob",
      "bloodGroup",
      "pAddress",
      "pDistrict",
      "pState",
      "pPinCode",
      "cAddress",
      "cDistrict",
      "cState",
      "cPinCode",
      "aadharNo",
      "panCard",
      "drivingLicence",
      "esiAccount",
      "uan",
      "bankDetails",
      "highQualification",
      "headQuatersName",
      "beat",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (typeof existingUser[field] === "string") {
          updateFields[field] = req.body[field] === "" ? "" : req.body[field];
        } else if (typeof existingUser[field] === "boolean") {
          updateFields[field] =
            req.body[field] === "" ? false : req.body[field];
        } else if (existingUser[field] instanceof Date) {
          updateFields[field] =
            req.body[field] === "" ? null : new Date(req.body[field]);
        } else {
          updateFields[field] = req.body[field];
        }
      }
    });

    // hash password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.body.email) {
     return next(new ApiError(400, "You can not change the email", [], error.stack));
    }

    const update = await UserDetail.findByIdAndUpdate(userId,updateFields,{
        new:true,
        runValidators:true,
    });

    return res.json(
        new ApiResponse(200,update,"User updated successfully...")
    );
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));
  }
};

// all user Get
const allUserGet = async(req,res,next)=>{
  // try
  try {
    const all = await UserDetail.find();
    return res.json(
      new ApiResponse(200,all,"user fetched successfully...")
  );
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));

  }
  
}
export { userRegister, userLogin, userUpdate,allUserGet };


