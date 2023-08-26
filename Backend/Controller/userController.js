import User from "../models/user.js";
import bcrypt from "bcrypt";


export const Register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const checkUser=await User.findOne({email}).exec();
        if(checkUser) return res.status(400).json({status:400,success:false,message:"You are already registered."});

        const encryptPass=await bcrypt.hash(password,10);

        const newUser=new User({
            name,
            email,
            password:encryptPass
        });
        await newUser.save();
        return res.status(200).json({status:200,success:true,message:"User registered successfully."});
    } catch (error) {
        return res.status(500).json({status:500,success:false,message:"Internal server error"});
    }
}