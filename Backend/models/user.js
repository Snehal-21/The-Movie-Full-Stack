import mongoose from "mongoose";
import { Schema } from "mongoose";

const user=new Schema({
    name:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    }
});

export default mongoose.model("User",user);