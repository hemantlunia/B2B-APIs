import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import connectToDB from "./DB/connectToDB.js";
import districtRouter from "./routes/district.route.js";
import versionRouter from "./routes/appVersion.route.js";


const app = express();
dotenv.config();

 
app.use(express.json());
app.use(cookieParser());

// change the origin while run in production
app.use(cors({
    origin: "*", 
    credentials:true
}));


// user-api
app.use("/api/v1/userApi",userRouter);   


// district-api
app.use("/api/v1/districtApi",districtRouter);


// version-check
app.use("/api/v1/app",versionRouter);


// Error handling middleware
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    connectToDB();
    console.log(`app is running on port : ${process.env.PORT}`);
}); 
