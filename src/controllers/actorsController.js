const db = require('../database/models');

const Op = db.Sequelize.Op;


const actorsController = {
    list:(req,res)=>{
        db.Actor.findAll()
            .then((actors)=>{
                res.render('actorsList', {actors:actors, title:'Todos los actores'})
            })
    },
    topActors:(req,res)=>{
        db.Actor.findAll({
            where: {
                rating: { [Op.gte] : 7}
            },
            order: [
                ['rating', 'DESC']
            ],
            limit: 5
        })
        .then((actors)=>{
            res.render('topActors', {actors:actors, title: 'Listado de mejores actores'})
        })
    },
    detail:(req,res)=>{
        db.Actor.findByPk(req.params.id,{
            include: [
                {association: 'movies'}
            ]
        })
            .then((actor)=>{
                res.render('actorsDetail', {actor:actor, title: `Detalle de ${actor.dataValues.first_name}`})
            })
    },
    add:(req,res)=>{
        res.render('actorForm', {title: 'Formulario de actor'})
    },
    create:(req,res)=>{
        db.Genre.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating
        })
        .then(()=>{
            res.redirect('/actors')
        })
        .catch(err => console.log(err));
    },
    edit:(req,res)=>{
        res.render('actorEdit', {title: 'Formulario de edición de actor'})
    },
    processEdit:(req,res)=>{
        db.Genre.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating

        },{
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect(`/actors/edit/${req.params.id}`)
        })
        .catch(err => console.log(err));
    },
    deleteActor:(req,res)=>{
        db.Genre.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect('/actors')
        })
        .catch(err => console.log(err));
    }
}

module.exports = actorsController;