import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";


const app = express();
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/userApi",userRouter)


app.listen(process.env.PORT,()=>{
    console.log(`app is running on port : ${process.env.PORT}`);
    
})
