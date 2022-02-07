const express = require('express');
const router = express.Router();

const {
    getMovies,
    addMovie,
    deleteMovie,
    updateMovie,
    searchMovie,
    getPaginatedMovies
} = require('../controllers/movie');
const {
    getCrewMembers,
    addCrewMember,
    deleteCrewMember,
    updateCrewMember
} = require('../controllers/crewMember');



router.get('/getMovies', getMovies);
router.get('/getCrewMembers', getCrewMembers);
router.post('/addMovie', addMovie);
router.post('/addCrewMember', addCrewMember);
router.delete('/deleteMovie/:id', deleteMovie);
router.delete('/deleteCrewMember/:id', deleteCrewMember);
router.put('/updateMovie/:id', updateMovie);
router.put('/updateCrewMember/:id', updateCrewMember);
router.get('/searchMovie', searchMovie);
router.get('/getPaginatedMovies', getPaginatedMovies);



module.exports = router;