const express = require('express');

const router = express.Router();


const {list, topActors, detail} = require('../controllers/actorsController')
router

.get('/actors', list)

.get('/actors/topActors', topActors)



.get('/actors/detail/:id', detail)







module.exports = router;