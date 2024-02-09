const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');


const moviesController = {
    list:(req,res)=>{
        db.Movie.findAll()
            .then((movies)=>{
                res.render('moviesList', {movies:movies})
            })
    },
    detail:(req,res)=>{
        db.Movie.findByPk(req.params.id)
            .then((movie)=>{
                res.render('moviesDetail', {movie:movie})
            })
    },
    newMovies:(req,res)=>{
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ]
        })
        .then((movies)=>{
            res.render('newestMovies', {movies:movies})
        })
    },
    recomended:(req,res)=>{
        db.Movie.findAll({
            where: {
                rating: { [Op.gte] : 8}
            },
            limit: 5,
            order: [
                ['rating', 'DESC']
            ]
        })
        .then((movies)=>{
            res.render('recommendedMovies',{movies:movies})
        })
    },
    add:(req,res)=>{
        res.render('movieForm')
    },
    create:(req,res)=>{
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
                res.render('movieEdit', {movie:movie})
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
            res.redirect('/movies')
        })
    },
    delete:(req,res)=>{

    }
}


module.exports = moviesController;