import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

// import broken from "../Assets/animation_llmd8o3i_small.gif"

const Single = () => {
    const [cast, setCast] = useState();
    const [movieDetail, setMovieDetail] = useState();
    const { id } = useParams();
    useEffect(() => {
        async function castDetail() {
            const response = await axios.post("http://localhost:4000/movie/getcastDetail", {
                id
            });
            const data = await response.data;
            setCast(data.cast);

            const movieResponse = await axios.post("http://localhost:4000/movie/getMovieDetail", {
                id
            })

            const movieData = await movieResponse.data;
            setMovieDetail(movieData);

        }
        castDetail();

        // new Splide( '.splide' ).mount( { AutoScroll } );
        const splide = new Splide('.splide', {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 6,
        });

        // Add the Autoplay plugin
        splide.mount({ AutoScroll });

    }, [id]);
    console.log(cast);
    console.log(movieDetail);

    const rating = Math.ceil(movieDetail?.vote_average * 10) / 10;

    const imageOnError = (event) => {
        event.currentTarget.src = "https://www.codespeedy.com/wp-content/uploads/2019/03/Chrome-Broken-Image-Icon.png";
        // event.currentTarget.src={broken};
    }
    return (
        <>
            <div>
                <div className="w-full bg-gray-800 flex flex-col " >
                    <div className="h-[500px] w-[95%] bg-gray-900 m-auto mb-5 mt-5 rounded-xl flex bg-gradient-to-r from-gray-950 to-gray-700">
                        <div className="w-[50%] h-full z-10 p-5">
                            <div className="h-1/2 w-full flex">
                                <div className="h-full w-[20%] p-2">
                                    <img className="h-full w-full" src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`} alt="" />
                                </div>
                                <div className="h-full w-[80%] p-2">
                                    <p className="text-xl text-white font-semibold">{movieDetail?.title}</p>
                                    <p className="text-base text-slate-500 mb-3">Rating : {rating}</p>
                                    <div className="h-[30px] w-full flex mb-3">
                                        <div className="h-full w-[60px] mr-3 border-slate-500 border rounded-md text-white text-xs flex justify-center items-center">{movieDetail?.runtime} min</div>
                                        {movieDetail?.genres && movieDetail?.genres.map((genres, i) => (
                                            <div className="pl-2" key={i}><p className="text-white">{genres.name}, </p></div>
                                        ))}
                                    </div>
                                    <p className="text-white text-base">Release Date : {movieDetail?.release_date}</p>
                                </div>
                            </div>
                            <div className="h-1/2 w-full p-2">
                                <h3 className="text-white text-2xl font-bold">Overview</h3>
                                <p className="text-white mt-5">{movieDetail?.overview}</p>
                            </div>
                        </div>
                        <div className="w-[50%] h-full p-3">
                            <img className="h-full w-full" src={`https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`} alt="" />
                        </div>
                    </div>
                    <div className=" w-[98%] m-auto rounded-xl p-2">
                        <p className="text-white text-xl mb-5">Cast</p>
                        <div className=" flex w-full">
                            <div className=" w-full justify-start ">
                                <Splide options={{
                                    type   : 'loop',
                                    drag   : 'free',
                                    focus  : 'center',
                                    perPage: 6,
                                    autoScroll: {
                                      speed: 1,
                                    },
                                }}>
                                    {cast && cast?.map((e, i) => (
                                        <SplideSlide key={i}>
                                            <div className="h-[300px] w-[190px] mr-5 mb-7">
                                                <img
                                                    className="w-full h-[85%]"
                                                    src={`https://image.tmdb.org/t/p/w500${e?.profile_path}`} onError={imageOnError}
                                                    alt=""
                                                />
                                                <p className="text-white text-center mt-2">{e?.name}</p>
                                            </div>
                                        </SplideSlide>
                                    ))}
                                </Splide>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Single;

// {cast && cast?.map((e, i) => (
//     <div key={i} className="h-[300px] w-[190px] mr-5">
//         <img className="w-full h-[85%]" src={`https://image.tmdb.org/t/p/w500${e?.profile_path}`} onError={imageOnError} alt="" />
//         <p className="text-white text-center mt-2">{e?.name}</p>
//     </div>
// ))}