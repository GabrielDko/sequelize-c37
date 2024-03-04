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
                {association: 'genre'},
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
        db.Genre.findAll()
            .then((genres)=>{
                return res.render('movieForm',{genres:genres,title:'Formulario de pelicula'})
            })
            .catch(err => console.log(err))
        
    },
    create:(req,res)=>{
        const errors = validationResult(req)
        console.log('Controlador create errors:',errors.mapped());
        if (!errors.isEmpty()){
            db.Genre.findAll()
            .then((genres)=>{
                return res.render('movieForm',{errors:errors.mapped(),genres:genres,title:'Formulario de pelicula'})
            })
            .catch(err => console.log(err))
        }else {
            const currentDate = new Date()
            db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre,
                created_at: currentDate,
                updated_at: currentDate
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
        const movieRequest = db.Movie.findByPk(req.params.id)
        const genreRequest = db.Genre.findAll()
        Promise.all([movieRequest,genreRequest])
            .then(([movie, genres])=>{
                const fecha = new Date(movie.dataValues.release_date);
                const año = fecha.getFullYear();
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const dia = fecha.getDate().toString().padStart(2, '0');
                const fechaFormateada = `${año}-${mes}-${dia}`
                movie.dataValues.release_date = fechaFormateada;
                res.render('movieEdit', {movie:movie, genres:genres, title:'Formulario de edición de pelicula'})
            })
            .catch(err =>{
                console.log(err);
            })
    },
    processEdit:(req,res)=>{
        console.log('Fecha update', req.body.release_date);
        const {id} = req.params
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre
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
    deleteForm:(req,res)=>{
        db.Movie.findByPk(req.params.id,{
            include: [
                {association: 'genre'},
                {association: 'actors'}
            ]
        })
            .then((movie)=>{
                res.render('moviesDelete', {movie:movie,title:`${movie.dataValues.title}`})
            })
            .catch(err =>{
                console.log(err);
            })
    },
    deleteMovie: async (req,res)=>{
        try {
            const movieId = req.params.id
            // Eliminar registros en la tabla pivot movie_movie que corresponden al movie
            await db.ActorMovie.destroy({
                where: {
                    movie_id: movieId
                }
            });
            await db.Actor.update({ favorite_movie_id: null }, {
                where: { favorite_movie_id: movieId }
            });
            // Luego de eliminar las relaciones, elimina al movie
            const numDeleted = await db.Movie.destroy({
                where: {
                    id: movieId
                }
            });
    
            if (numDeleted === 1) {
                res.redirect('/movies')
            } else {
                throw new Error(`No se encontró al movie con ID ${movieId}`);
            }
        } catch (error) {
            console.error('Error al eliminar al movie:', error);
        }
        
    }
}


module.exports = moviesController;