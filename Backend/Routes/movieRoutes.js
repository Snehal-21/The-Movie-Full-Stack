import express from "express";
import { getMovie, getTopRated, getUpcoming, serchMovie } from "../Controller/movieController.js";
const router=express.Router();

router.get('/getMovies',getMovie);
router.get('/getUpcoming',getUpcoming);
router.get('/getTopRated',getTopRated);
router.post('/serchMovie',serchMovie);

export default router;