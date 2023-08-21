import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./Routes/movieRoutes.js";

const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/movie',router);

app.listen(4000,()=>console.log("Working om Port"));