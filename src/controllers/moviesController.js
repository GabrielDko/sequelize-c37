const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');


const moviesController = {
    list:(req,res)=>{
        db.Movie.findAll()
            .then((movies)=>{
                res.render('moviesList', {movies:movies, title: 'Todas las peliculas'})
            })
            .catch(err =>{
                console.log(err);
            })
    },
    detail:(req,res)=>{
        db.Movie.findByPk(req.params.id,{
            include: [
                {association: 'genres'},
                {association: 'actors'}
            ]
        })
            .then((movie)=>{
                res.render('moviesDetail', {movie:movie,title:`${movie.dataValues.title}`})
            })
            .catch(err =>{
                console.log(err);
            })
    },
    newMovies:(req,res)=>{
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ]
        })
        .then((movies)=>{
            res.render('newestMovies', {movies:movies,title:'Peliculas ordenadas por fecha de estreno'})
        })
        .catch(err =>{
            console.log(err);
        })
    },
    recomended:(req,res)=>{
        db.Movie.findAll({
            limit: 5,
            order: [
                ['rating', 'DESC'],
                ['release_date', 'DESC']
            ]
        })
        .then((movies)=>{
            res.render('recommendedMovies',{movies:movies,title:'Peliculas recomendadas'})
        })
        .catch(err =>{
            console.log(err);
        })
    },
    add:(req,res)=>{
        res.render('movieForm',{title:'Formulario de pelicula'})
    },
    create:(req,res)=>{
        const errors = validationResult(req)
        console.log('Controlador create errors:',errors.mapped());
        if (!errors.isEmpty()){
            res.render('movieForm', {errors:errors.mapped(),title:'Formulario de pelicula'})
        }else {
            db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length
            })
            .then(()=>{
                res.redirect('/movies')
            })
            .catch(err =>{
                console.log(err);
            })
        }
        
    },
    edit:(req,res)=>{
        db.Movie.findByPk(req.params.id)
            .then((movie)=>{
                const fecha = new Date(movie.dataValues.release_date);
                const año = fecha.getFullYear();
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const dia = fecha.getDate().toString().padStart(2, '0');
                const fechaFormateada = `${año}-${mes}-${dia}`
                movie.dataValues.release_date = fechaFormateada;
                res.render('movieEdit', {movie:movie, title:'Formulario de edición de pelicula'})
            })
            .catch(err =>{
                console.log(err);
            })
    },
    processEdit:(req,res)=>{
        const {id} = req.params
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        },{
            where: {
                id
            }
        }).then(()=>{
            res.redirect('/movies');
        })
        .catch(err =>{
            console.log(err);
        })
    },
    deleteMovie:(req,res)=>{
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect('/movies');
        })
        .catch(err => console.log('Destroy error:' ,err));
    }
}


module.exports = moviesController;