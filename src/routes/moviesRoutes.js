const express = require('express');
const router = express.Router();
const {list, detail,newMovies,recomended, add,create, edit,processEdit,deleteMovie, deleteForm} = require('../controllers/moviesController');
const movieRegisterValidator = require('../validations/movieRegisterValidator');
const movieUpdateValidator = require('../validations/movieUpdateValidator')


router

// Ruta que muestra una vista listando todas las peliculas.

.get('/movies', list)


// Ruta que muestra una vista listando las peliculas en orden desde la más nueva a la mas vieja.
.get('/movies/new', newMovies)


// Ruta que muestra una vista listando las peliculas con mayor rating ordenadas por su fecha de estreno.
.get('/movies/recommended', recomended)


// Ruta que muestra un formulario de registro de peliculas.
.get('/movies/add',add)


// Ruta que procesa la solicitud de creación de una pelicula.
.post('/movies/create',movieRegisterValidator, create)

// Ruta que muestra un formulario de edición a una pelicula.

.get('/movies/edit/:id',edit)


// Ruta que procesa la solcitud de edición de una pelicula.
.put('/movies/edit/:id',movieUpdateValidator,processEdit)


.get('/movies/deleteForm/:id', deleteForm)
// Ruta que procesa la solcitud de eliminación de una pelicula.

.delete('/movies/delete/:id',deleteMovie)

// Ruta que muestra una vista con el detalle de una pelicula.
.get('/movies/detail/:id', detail)

module.exports = router;