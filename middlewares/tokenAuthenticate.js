import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
// import UserDetail from "../models/user.model.js";

const tokenAuthenticateUser = async (req, resizeBy, next) => {
  try {
    // Get token from the headers
    const token = req.header("Authorization");
    if (!token) {
      return next(new ApiError(401, "Token is missing, Unauthorized..."));
    }

    // verify the token
    const decode = await jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid Token - Unauthorized..."));
  }
};

export { tokenAuthenticateUser };
