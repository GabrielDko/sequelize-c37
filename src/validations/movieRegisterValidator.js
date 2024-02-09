const {body}=require("express-validator")
const db = require('../database/models')

let validacionRegistro=[
    body("title")
    .notEmpty().withMessage("*Debes ingresar un título.").bail()
    .isLength({min:5, max:15}).withMessage("*Debe poseer una cantidad mínima de 5 carácteres y una máxima de 15."),
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
    .isDate().withMessage('*Debe ingresar un formato de fecha válido').bail()
]
module.exports={validacionRegistro}