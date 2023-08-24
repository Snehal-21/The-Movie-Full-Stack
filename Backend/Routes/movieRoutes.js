import express from "express";
import { getMovie, getMovieDetail, getTopRated, getUpcoming, getcastDetail, serchMovie } from "../Controller/movieController.js";
import { registerChecks } from "../Middleware/auth.js";
import { Register } from "../Controller/userController.js";
const router=express.Router();

router.get('/getMovies',getMovie);
router.get('/getUpcoming',getUpcoming);
router.get('/getTopRated',getTopRated);
router.post('/serchMovie',serchMovie);
router.post('/getcastDetail',getcastDetail);
router.post('/getMovieDetail',getMovieDetail);


router.post('/register',registerChecks,Register);

export default router;