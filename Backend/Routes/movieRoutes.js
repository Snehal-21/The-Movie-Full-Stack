import express from "express";
import { getMovie, getMovieDetail, getTopRated, getUpcoming, getcastDetail, serchMovie } from "../Controller/movieController.js";
import { loginChecks, registerChecks } from "../Middleware/auth.js";
import { Register, getCurrentUser, login } from "../Controller/userController.js";
const router=express.Router();

router.post('/getMovies',getMovie);
router.get('/getUpcoming',getUpcoming);
router.get('/getTopRated',getTopRated);
router.post('/serchMovie',serchMovie);
router.post('/getcastDetail',getcastDetail);
router.post('/getMovieDetail',getMovieDetail);
// router.post('/getPage',getMoviePage);


router.post('/register',registerChecks,Register);
router.post('/login',loginChecks,login);
router.post('/getCurrentUser',getCurrentUser);

export default router;