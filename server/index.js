import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userroutes from "./routes/userroutes.js";
import multer from "multer";


const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true
})); 
app.use("/api/model",userroutes);
app.use("/uploads/videos",express.static("uploads/videos"));

app.use(express.json());




const port = process.env.PORT || 3001;
const server = app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})