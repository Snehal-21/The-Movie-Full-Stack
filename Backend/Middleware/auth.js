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

