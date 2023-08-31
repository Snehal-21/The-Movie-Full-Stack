import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../style/loader.css"
import Loader from './Loader';

const Home = () => {
    const [page, setPage] = useState(1);
    const [scrollMovies, setScrollMovies] = useState([]);
    const [loader, setLoader] = useState(false);
    const [screenLoader,setScreenLoader]=useState(true);
    const router = useNavigate();

    useEffect(() => {
        async function movieData() {
            setTimeout(async () => {
                try {
                    const response = await axios.post('http://localhost:4000/movie/getMovies', { page });
                    const newMovies = response.data.results;
                    setScrollMovies((x) => [...x, ...newMovies]);
                    setLoader(false);
                    setScreenLoader(false);
                } catch (error) {
                    console.log("Error while fetching movies", error)
                }
            }, 650);
        }
        movieData();
    }, [page]);

    const redirectToSingle = (id) => {
        router(`/single/${id}`);
    }

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setPage((x) => x + 1);
            setLoader(true);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);


    return (
        <>

            {screenLoader ? <Loader /> : (<div className='bg-slate-900 pt-20' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {scrollMovies && scrollMovies.map((movie, i) => (
                    <div onClick={() => redirectToSingle(movie.id)} key={i} style={{ width: '18%', height: '400px', marginBottom: '10px', marginRight: '1px', textAlign: 'center' }}>
                        <img style={{ height: '300px', width: '100%', marginBottom: '20px', objectFit: 'cover' }} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                        <h1 className='text-white text-xl'>{movie.title}</h1>
                    </div>

                ))}
                {loader && (<div className="w-full pt-16 pb-10 flex items-center justify-center z-50">
                    <svg className="loaderAnimation" viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                </div>)}
            </div>)}
        </>
    )
};

export default Home;
