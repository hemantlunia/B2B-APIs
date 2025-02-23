import express from "express";
import { allUserGet, userLogin, userRegister, userUpdate } from "../controllers/userController.js";
import { tokenAuthenticateUser } from "../middlewares/tokenAuthenticate.js";


const userRouter = express.Router();

userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
userRouter.put("/update",tokenAuthenticateUser,userUpdate);
userRouter.get("/alluser",allUserGet);

export default userRouter;