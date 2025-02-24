import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import connectToDB from "./DB/connectToDB.js";
import districtRouter from "./routes/district.route.js";


const app = express();
dotenv.config();

connectToDB(); 
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


// Error handling middleware
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`app is running on port : ${process.env.PORT}`);
});
