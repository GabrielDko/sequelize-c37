const db = require('../database/models');

const Op = db.Sequelize.Op;


const actorsController = {
    list:(req,res)=>{
        db.Actor.findAll()
            .then((actors)=>{
                res.render('actorsList', {actors:actors})
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
            res.render('topActors', {actors:actors})
        })
    },
    detail:(req,res)=>{
        db.Actor.findByPk(req.params.id)
            .then((actor)=>{
                res.render('actorsDetail', {actor:actor})
            })
    }
}

module.exports = actorsController;