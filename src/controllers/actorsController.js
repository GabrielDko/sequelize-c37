const db = require('../database/models');

const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');

const actorsController = {
    list: (req, res) => {
        db.Actor.findAll()
            .then((actors) => {
                res.render('actorsList', { actors: actors, title: 'Todos los actores' })
            })
    },
    topActors: (req, res) => {
        db.Actor.findAll({
            where: {
                rating: { [Op.gte]: 7 }
            },
            order: [
                ['rating', 'DESC']
            ],
            limit: 5
        })
            .then((actors) => {
                res.render('topActors', { actors: actors, title: 'Listado de mejores actores' })
            })
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id, {
            include: [
                { association: 'movies' }
            ]
        })
            .then((actor) => {
                db.Movie.findAll()
                    .then((movies)=>{
                        console.log(movies);
                        res.render('actorsDetail', {movies:movies, actor: actor, title: `${actor.dataValues.first_name + " " + actor.dataValues.last_name}` })
                    })
                
            })
    },
    add: (req, res) => {
        db.Movie.findAll()
            .then((movies) => {
                res.render('actorForm', { title: 'Formulario de actor', movies: movies })
            })
    },
    create: (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            db.Movie.findAll()
            .then((movies) => {
                res.render('actorForm', {errors: errors.mapped(), title: 'Formulario de actor', movies: movies })
            })
        } else {
            const currentDate = new Date();
            db.Actor.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie ? req.body.favorite_movie : null,
                created_at: currentDate,
                updated_at: currentDate
            })
                .then((actor) => {
                    if (req.body.movies && req.body.movies.length > 0) {
                        const selectedMovies = req.body.movies;
    
                        db.Movie.findAll({
                            where: {
                                id: selectedMovies
                            }
                        })
                            .then((movies) => {
                                actor.addMovies(movies)
                                    .then(() => {
                                        res.redirect('/actors');
                                    })
                                    .catch(err => console.log(err));
                            })
                            .catch(err => console.log(err));
                    } else {
                        res.redirect('/actors');
                    }
                })
                .catch(err => console.log(err));
        }
        
    },

    edit: (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then((actor) => {
                db.Movie.findAll()
                    .then(allMovies => {
                        actor.getMovies()
                            .then(actorMovies => {
                                res.render('actorEdit', { actor: actor, allMovies: allMovies, actorMovies: actorMovies, title: 'Formulario de edición de actor' })
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    },

    processEdit: (req, res) => {
        const currentDate = new Date();
        console.log('peli fav:',req.body.favorite_movie);
        db.Actor.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie ? req.body.favorite_movie : null,
            created_at: currentDate,
            updated_at: currentDate
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            // Después de la actualización, encontrar al actor actualizado
            db.Actor.findByPk(req.params.id)
                .then(actor => {
                    // Asociar las películas seleccionadas con el actor actualizado
                    if (req.body.movies && req.body.movies.length > 0) {
                        // Obtener las películas seleccionadas desde el cuerpo de la solicitud
                        const selectedMovies = req.body.movies;
    
                        // Buscar las instancias de las películas seleccionadas en la base de datos
                        db.Movie.findAll({
                            where: {
                                id: selectedMovies
                            }
                        })
                        .then((movies) => {
                            // Asociar las películas encontradas con el actor actualizado
                            actor.addMovies(movies)
                                .then(() => {
                                    res.redirect(`/actors/edit/${req.params.id}`);
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    } else {
                        res.redirect(`/actors/edit/${req.params.id}`);
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    
    deleteForm: (req, res) => {
        db.Actor.findByPk(req.params.id, {
            include: [
                { association: 'movies' }
            ]
        })
            .then((actor) => {
                res.render('actorsDelete', { actor: actor, title: `${actor.dataValues.first_name + " " + actor.dataValues.last_name}` })
            })
            .catch(err => {
                console.log(err);
            })
    },
    deleteActor: async (req, res) => {
        try {
            const actorId = req.params.id
            // Eliminar registros en la tabla pivot actor_movie que corresponden al actor
            await db.ActorMovie.destroy({
                where: {
                    actor_id: actorId
                }
            });
    
            // Luego de eliminar las relaciones, elimina al actor
            const numDeleted = await db.Actor.destroy({
                where: {
                    id: actorId
                }
            });
    
            if (numDeleted === 1) {
                res.redirect('/actors')
            } else {
                throw new Error(`No se encontró al actor con ID ${actorId}`);
            }
        } catch (error) {
            console.error('Error al eliminar al actor:', error);
        }
    }
}

module.exports = actorsController;