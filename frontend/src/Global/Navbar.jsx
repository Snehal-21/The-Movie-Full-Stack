import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [movie, setMovie] = useState({ movie: "" });
    const [movieData, setMovieData] = useState();
    const [button, setButton] = useState(false);

    const router = useNavigate();


    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }

    const handleClick = async () => {
        const response = await axios.post("http://localhost:4000/movie/serchMovie", {
            movie: movie.movie
        })
        const data = await response.data;
        if (data.results.length > 0) {
            setMovieData(data.results);
            setButton((x) => !x);

        }
    }

    return (
        <>
            <nav className='h-16 w-full bg-slate-800 flex justify-around'>
                <div className='w-[10%] h-full  flex justify-center items-center text-white text-lg cursor-pointer' onClick={() => router('/')}><p>MovieDb</p></div>
                <div className='w-[40%]  h-full flex justify-between items-center text-gray-600 text-lg'>
                    <p className='cursor-pointer' onClick={() => router('/')}>Popular</p>
                    <p className='cursor-pointer' onClick={() => router('/toprated')}>Top Rated</p>
                    <p className='cursor-pointer' onClick={() => router('/upcoming')}>Upcoming</p>
                    <input onChange={handleChange} className='h-[60%] pl-5 rounded-lg' name="movie" type="text" placeholder="Movie Name" />
                    <button onClick={handleClick} className='h-[60%] w-28 bg-slate-600 text-white rounded-lg cursor-pointer'>Search</button>
                </div>

            </nav>
            {/* <div className='h-auto w-[400px] bg-slate-900 fixed z-10 right-48 rounded-lg'></div> */}
            {button && <div className='h-[500px] w-[400px] bg-slate-900 fixed z-10 right-48 rounded-lg overflow-y-scroll'>
                {movieData && movieData.map((movie,i)=>(
                    <div className='h-[60px] w-full p-5 text-white text-xl ' key={i}>
                        {movie.original_title}
                    </div>
                ))}
            </div>}
        </>

    )
}

export default Navbar;