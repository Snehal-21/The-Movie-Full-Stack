import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import LoginF from './LoginF';

const Register = ({onClose}) => {
  const[userData,setUserData]=useState({name:"",email:"",password:"",confirmpassword:""});
  const [login,setLogin]=useState(false);

  const redirectToLogin=()=>{
    setLogin((x)=>!x);
  }
  const handleChange=(e)=>{
    setUserData({...userData,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e)=>{
      e.preventDefault();
      if(userData.name && userData.email && userData.password && userData.confirmpassword){
        try {
          const response=await axios.post("http://localhost:4000/movie/register",{
            name:userData.name,
            email:userData.email,
            password:userData.password,
            confirmpassword:userData.confirmpassword
          });
          const data=response.data;
          if(data.success){
            toast.success(data.message);
          }
        } catch (error) {
          if(!error.response.data.success){
            toast.error(error.response.data.message);
          }
        }
      }else{
          toast.error("All fields are required")
      }
  }
  return (
    <>
    <div className='fixed h-[450px] w-[25%] z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950 rounded-xl p-3'>
      <form className='w-full pl-5 pt-5' onSubmit={handleSubmit}>
      <svg className="cursor-pointer w-[20px] h-[20px] fixed z-30 right-[35px] top-[30px]" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#fafafa" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        <label className='text-white text-xs'>Name</label><br/>
        <input className=' h-[30px] w-[90%] bg-gray-950  border-b-[1px] mb-3 outline-none text-slate-400' onChange={handleChange} type="text" name="name" /><br/>
        <label className='text-white text-xs'>Email</label><br/>
        <input className=' h-[30px] w-[90%] bg-gray-950  border-b-[1px] mb-3 outline-none text-slate-400' onChange={handleChange} type="email" name="email" /><br/>
        <label className='text-white text-xs'>Password</label><br/>
        <input className=' h-[30px] w-[90%] bg-gray-950  border-b-[1px] mb-3 outline-none text-slate-400' onChange={handleChange} type="password" name="password" /><br/>
        <label className='text-white text-xs'>Confirm Password</label><br/>
        <input className=' h-[30px] w-[90%] bg-gray-950  border-b-[1px] mb-3 outline-none text-slate-400' onChange={handleChange} type="password" name="confirmpassword" /><br/>
        <p className='text-white text-sm text-center mt-5 hover:underline cursor-pointer' onClick={redirectToLogin}>Already have an account? Login Here</p>
        <input className='h-[40px] w-[100px] border fixed top-[86%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:bg-white hover:text-gray-950' type="submit" value="Register" />
      </form>
    </div>
    {login && <LoginF onClose={onClose} />}
    </>
  )
}

export default Register;