import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const[userData,setUserData]=useState({name:"",email:"",password:"",confirmpassword:""});

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br/>
        <input onChange={handleChange} type="text" name="name" placeholder='Enter User Name' /><br/>
        <label>Email:</label><br/>
        <input onChange={handleChange} type="email" name="email" placeholder='Enter User Email' /><br/>
        <label>Password:</label><br/>
        <input onChange={handleChange} type="password" name="password" placeholder='Enter User Password' /><br/>
        <label>Confirm Password:</label><br/>
        <input onChange={handleChange} type="password" name="confirmpassword" placeholder='Confirm your password' /><br/>
        <input type="submit" value="Register" />
      </form>
    </div>
    </>
  )
}

export default Register;