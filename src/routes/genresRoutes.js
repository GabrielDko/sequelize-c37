const express = require('express');
const router = express.Router();
const {list,detail,add,create,edit,processEdit,deleteGenre} = require('../controllers/genresController');

router

// Ruta que muestra una vista listando todas los géneros.


.get('/genres', list)

// Ruta que muestra una vista con el detalle de un género.
.get('/genres/detail/:id', detail)


module.exports = router;