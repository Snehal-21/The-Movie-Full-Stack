import axios from "axios";

const Api_Key="c45a857c193f6302f2b5061c3b85e743";
export const getMovie=async(req,res)=>{
    try {
        const getData=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${Api_Key}&language=en-US`);
        const data=getData.data;
        return res.status(200).json(data);

    } catch (error) {
        return res.status(400).json({status:400,message:"Internal server error"});
    }
}

export const getUpcoming=async(req,res)=>{
    try {
        const getData=await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_Key}&language=en-US`);
        const data=getData.data;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({status:400,message:"Internal server error"});
    }
}

export const getTopRated=async(req,res)=>{
    try {
        const getData=await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_Key}&language=en-US&page=1`);
        const data=getData.data;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({status:400,message:"Internal server error"});
    }
}

export const serchMovie=async(req,res)=>{
    try {
        const {movie}=req.body;
        const getSearch=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${Api_Key}&language=en-US&query=${movie}`);
        const data=await getSearch.data;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({status:400,message:"Internal server error"});
    }
}