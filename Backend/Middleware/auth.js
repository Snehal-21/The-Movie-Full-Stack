import User from "../models/user.js";
import bcrypt from "bcrypt";

export const registerChecks=async(req,res,next)=>{
    try {
        const {name,email,password,confirmpassword}=req.body;
        if(!name) return res.status(400).json({status:400,success:false,message:"User Name is required."});
        if(!email) return res.status(400).json({status:400,success:false,message:"User Email is required."});
        if(!password) return res.status(400).json({status:400,success:false,message:"User Password is required."});
        if(!confirmpassword) return res.status(400).json({status:400,success:false,message:"Confirm Password is required."});
        if(password.lenght<8 && confirmpassword.length<8) return res.status(400).json({status:400,success:false,message:"password should be greater than 8 digits."});
        if(password!=confirmpassword) return res.status(400).json({status:400,success:false,message:"Password should be equal."})
        next();
        
    } catch (error) {
        return res.status(500).json({status:500,success:true,message:"Internal server error"});
    }
}

export const loginChecks=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email) return res.status(400).json({status:400,success:false,message:"User Email is required."});
        if(!password) return res.status(400).json({status:400,success:false,message:"User Password is required."});

        const checkUser=await User.findOne({email}).exec();
        if(!checkUser) return res.status(404).json({status:404,success:false,message:"User not found"});

        const decPass=await bcrypt.compare(password,checkUser.password);

        if(!decPass) return res.status(400).json({status:400,success:false,message:"Incorrect Credentials"});
        next();

    } catch (error) {
        return res.status(500).json({status:500,success:false,message:"Internal server errorr",error:error})
    }
}