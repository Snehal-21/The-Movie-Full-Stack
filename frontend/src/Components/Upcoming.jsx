import React, { useEffect, useState } from 'react';
import axios from "axios";

const Upcoming = () => {
    const[upcoming,setUpcoming]=useState();

    useEffect(()=>{
        async function upcomingData(){
            const response=await axios.get('http://localhost:4000/movie/getUpcoming');
            setUpcoming(response.data.results);
        }
        upcomingData();
    },[])
    console.log(upcoming);
  return (
    <>
        <div className='bg-slate-900 pt-20' style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly'}}>
        {upcoming && upcoming.map((movie,i)=>(
            <div key={i} style={{width:'18%',height:'400px',marginBottom:'10px',marginRight:'1px',textAlign:'center'}}>
                <img style={{height:'300px',width:'100%',marginBottom:'20px',objectFit:'cover'}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                <h1 className='text-white text-xl'>{movie.title}</h1>
            </div>
        ))}
    </div>
    </>
  )
}

export default Upcoming;