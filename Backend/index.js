import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./Routes/movieRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app=express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/movie',router);

mongoose.connect(process.env.MONGO)
.then(()=>console.log("Db Connected"))
.catch((err)=>console.log("DB error ==>",err));

app.listen(process.env.PORT,()=>console.log(`Working om Port ${process.env.PORT}`));