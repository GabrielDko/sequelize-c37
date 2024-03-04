const express = require('express');

const router = express.Router();


const {list, topActors, detail,add,create,edit,processEdit,deleteActor, deleteForm} = require('../controllers/actorsController')
const actorRegisterValidator = require('../validations/actorRegisterValidator')
router

.get('/actors', list)

.get('/actors/topActors', topActors)

// Ruta que muestra un formulario de registro de una ctor.
.get('/actors/add',add)


// Ruta que procesa la solicitud de creación de un actor.


.post('/actors/create',actorRegisterValidator, create)


// Ruta que muestra un formulario de edición a un actor.

.get('/actors/edit/:id',edit)


// Ruta que procesa la solcitud de edición de un actor.
.put('/actors/edit/:id',processEdit)

// Ruta que muestra una vista de confirmación para la eliminación de un actor.


.get('/actors/deleteForm/:id', deleteForm)
// Ruta que procesa la solcitud de eliminación de un actor.

.delete('/actors/delete/:id',deleteActor)


.get('/actors/detail/:id', detail)







module.exports = router;