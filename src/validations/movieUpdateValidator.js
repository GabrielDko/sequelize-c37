const {body}=require("express-validator")
const db = require('../database/models')

let movieUpdateValidator=[
    body("title")
    .notEmpty().withMessage("*Debes ingresar un título.").bail()
    .isLength({min:5, max:25}).withMessage("*Debe poseer una cantidad mínima de 5 carácteres y una máxima de 25.")
    .custom((value, { req }) => {
        return db.Movie.findOne({
            where: {
                title: value
            }
        })
        .then(movie => {
            if (movie) {
                return Promise.reject('Esta película ya está registrada.');
            }
        });
    }),
    body("length")
    .isInt().withMessage('*El número ingresado debe ser un número entero.'),
    body("rating")
    .notEmpty().withMessage("*Debes especificar un rating.").bail()
    .isDecimal().withMessage('*Debe especificar un número decimal.'),
    body('awards')
    .notEmpty().withMessage('*Debe especificar la cantidad de premios.').bail()
    .isInt().withMessage('*Debe especificar un número entero.'),
    body('release_date')
    .notEmpty().withMessage('*Debe ingresar una fecha')
    .isISO8601().withMessage('*Debe ingresar una fecha y hora en formato ISO 8601')]
module.exports= movieUpdateValidator;