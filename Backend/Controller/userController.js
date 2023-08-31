import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkUser = await User.findOne({ email }).exec();
        if (checkUser) return res.status(400).json({ status: 400, success: false, message: "You are already registered." });

        const encryptPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: encryptPass
        });
        await newUser.save();
        return res.status(200).json({ status: 200, success: true, message: "User registered successfully." });
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email } = req.body;
        const loginUser = await User.findOne({ email }).exec();
        if (!loginUser) return res.status(404).json({ status: 400, success: false, message: "User not found." });

        const token = process.env.JWT;
        const encToken = jwt.sign({ userId: loginUser._id }, token);
        if (encToken) {
            return res.status(200).json({ status: 200, success: true, message: "Log in successful", token: encToken, user: loginUser });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, error: error, message: "Internal server error" });
    }
}


export const getCurrentUser=async(req,res)=>{
    try {
        const {token}=req.body;
        const decToken=jwt.verify(token,process.env.JWT);
        const userId=decToken.userId;
        const user=await User.findById(userId);
        if(user){
            return res.status(200).json({status:200,success:true,user})
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, error: error, message: "Internal server errorrrrrrr" });
    }
}