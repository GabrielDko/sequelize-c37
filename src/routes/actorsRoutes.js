const express = require('express');

const router = express.Router();


const {list, topActors, detail,add,create,edit,processEdit,deleteActor} = require('../controllers/actorsController')
router

.get('/actors', list)

.get('/actors/topActors', topActors)

// Ruta que muestra un formulario de registro de géneros.
.get('/actors/add',add)


// Ruta que procesa la solicitud de creación de un género.


.post('/actors/create', create)


// Ruta que muestra un formulario de edición a una pelicula.

.get('/actors/edit/:id',edit)


// Ruta que procesa la solcitud de edición de una pelicula.
.put('/actors/edit/:id',processEdit)

// Ruta que procesa la solcitud de eliminación de una pelicula.

.delete('/actors/delete/:id',deleteActor)


.get('/actors/detail/:id', detail)







module.exports = router;