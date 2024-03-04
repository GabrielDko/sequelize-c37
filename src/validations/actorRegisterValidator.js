const {body}=require("express-validator")
const db = require('../database/models')

let actorValidator =[
    body('first_name')
    .notEmpty().withMessage("*Debes ingresar un apellido.").bail()
    .isLength({min:3, max:40}).withMessage("*Debe poseer una cantidad mínima de 3 carácteres y una máxima de 40."),
    body("last_name")
    .notEmpty().withMessage("*Debes ingresar un nombre.").bail()
    .isLength({min:3, max:40}).withMessage("*Debe poseer una cantidad mínima de 3 carácteres y una máxima de 40.")
    .custom((value, { req }) => {
        return db.Actor.findOne({
            where: {
                last_name: value
            }
        })
        .then(movie => {
            if (movie) {
                return Promise.reject('Este actor ya está registrado.');
            }
        });
    }),
    body("rating")
    .notEmpty().withMessage("*Debes especificar un rating.").bail()
    .isDecimal().withMessage('*Debe especificar un número decimal.')
]
module.exports= actorValidator ;