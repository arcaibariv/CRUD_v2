const categoriasService = require('../services/categorias.services')
const articulosServices = require('../services/articulos.services')
const sequelize = require('../db/conexion')

module.exports.existeCategoria = async (req,res,next) => {
    try {
        let result = await sequelize.query(`SELECT * FROM categorias WHERE id_cat = '${req.body.id}' LIMIT 1`)
        if (result[0].length === 0) {
            res.status(404).json({error: 'La categoria no existe'})
            throw new Error('La categoria no existe.')
        } else {
            return next()
        }
    } catch (error) {
        //res.status(500).json({error: error.message})
    }
}

module.exports.validacionCategoria = async (req,res,next) => {
    try {
        let result = await sequelize.query(`SELECT * FROM categorias WHERE id_cat = '${req.body.id}' LIMIT 1`)
        if (result[0].length === 0) {
            return next()
        } else {
            res.status(404).json({error: 'No se puede agregar una categoria que ya existe.'})
            throw new Error('No se puede agregar una categoria que ya existe.')
        }
    } catch (error) {
        //res.status(500).json({error: error.message})
    }
}