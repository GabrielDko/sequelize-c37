const db = require('../database/models');

const Op = db.Sequelize.Op;


const genresController = {
    list:(req,res)=>{
        db.Genre.findAll()
            .then((genres)=>{
                res.render('genresList',{genres:genres, title: 'Todos los géneros'})
            })
    },
    detail:(req,res)=>{
        db.Genre.findByPk(req.params.id)
            .then((genre)=>{
                res.render('genresDetail', {genre:genre, title: `Detalle ${genre.dataValues.name}`})
            })
    }
}

module.exports = genresController;