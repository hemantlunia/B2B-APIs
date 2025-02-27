import express from "express";
import { allUserGet, userBlock, userLogin, userRegister, userUpdate } from "../controllers/userController.js";
import { tokenAuthenticateUser } from "../middlewares/tokenAuthenticate.js";


const userRouter = express.Router();

// register
userRouter.post("/register",userRegister);

// login
userRouter.post("/login",userLogin);

// update
userRouter.put("/update/:userId",tokenAuthenticateUser,userUpdate);

// alluser
userRouter.get("/alluser",allUserGet);

// block-user
userRouter.post("/block",tokenAuthenticateUser,userBlock);

export default userRouter;