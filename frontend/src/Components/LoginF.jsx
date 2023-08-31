import React, { useContext, useState } from 'react'
import Register from '../Components/Register'
import { AuthContext } from './Context/AuthContext';
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginF = ({onClose}) => {
  const [userData,setUserData]=useState({email:"",password:""})
  const [register,setRegister]=useState(false);
  const {state,login}=useContext(AuthContext);
  console.log(state);
  const router=useNavigate();

  const handleChange=(e)=>{
      setUserData({...userData,[e.target.name]:e.target.value})
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(userData.email && userData.password){
      try {
        const response=await axios.post("http://localhost:4000/movie/login",{
          email:userData.email,
          password:userData.password
        });
        if(response.data.success){
          login({
            token:response?.data?.token,
            payload:response?.data?.user
          });
          toast.success(response.data.message);
          router('/');
        }
      } catch (error) {
        console.log(error);
        if(!error.response.data.success){
          toast.error(error.response.data.message);
        }
      }
    }else{
      toast.error("All fields are required.")
    }
  }

  const redirectToRegister=()=>{
    setRegister((x)=>!x);
  }
  return (
    <>
       <div className='fixed h-[450px] w-[25%] z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950 rounded-xl p-3'>
      <form className='w-full pl-5 pt-5' onSubmit={handleSubmit}>
      <svg className="cursor-pointer w-[20px] h-[20px] fixed right-[35px] top-[30px]" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fafafa" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        <label className='text-white text-xs'>Email</label><br/>
        <input className=' h-[30px] w-[90%] bg-gray-950  border-b-[1px] mb-3 outline-none text-slate-400' onChange={handleChange} type="email" name="email" /><br/>
        <label className='text-white text-xs'>Password</label><br/>
        <input className=' h-[30px] w-[90%] bg-gray-950  border-b-[1px] mb-3 outline-none text-slate-400' onChange={handleChange} type="password" name="password" /><br/>
        <p className='text-white text-sm text-center mt-5 hover:underline cursor-pointer' onClick={redirectToRegister}>Don't have an account? SignUp Here</p>
        <input className='h-[40px] w-[100px] border fixed top-[86%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:bg-white hover:text-gray-950' type="submit" value="Login" />
      </form>
    </div>
    {register && <Register onClose={onClose} />}
    </>
  )
}

export default LoginF