const express = require('express');
const router = express.Router();
const {list, detail,newMovies,recomended, add,create, edit,processEdit} = require('../controllers/moviesController');

router

.get('/movies', list)

.get('/movies/new', newMovies)

.get('/movies/recommended', recomended)

.get('/movies/add',add)

.post('/movies/create', create)

.get('/movies/edit/:id',edit)

.put('/movies/edit/:id',processEdit)

.get('/movies/detail/:id', detail)

module.exports = router;