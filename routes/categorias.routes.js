const categoriasServices = require('../services/categorias.services.js')
const middCategorias = require('../middleware/categorias.middleware')

module.exports = (app) => {

    app.get('/categorias', async (req,res) => {
        try {
            let resultado = await categoriasServices.listaCategorias()
            res.json(resultado[0])
        } catch (error) {
            console.log(error.message)
        }
    })

    app.post('/categorias',middCategorias.validacionCategoria, async (req,res) => {
        let categoria = req.body
        try {
            let resultado = await categoriasServices.nuevaCategoria(categoria)
            res.json(resultado)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error: error.message})
        }
    })

    app.get('/categorias/articulos', middCategorias.existeCategoria ,async (req,res) => {
        let categoria = req.body
        try {
            let resultado = await categoriasServices.articulosCategoria(categoria)
            res.json(resultado[0])
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error:error.message})
        }
    })
}