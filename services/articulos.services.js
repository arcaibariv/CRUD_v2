const sequelize = require('../db/conexion.js')

module.exports.nuevoArticulo = async (articulo) => {
    //let id = await sequelize.query('SELECT count(id_item) FROM articulos')

    let newProd = [ `${articulo.cat}-${articulo.numero}`, articulo.descripcion, articulo.cat, articulo.disponibilidad, articulo.precio ]

    try {
        let resultado = await sequelize.query(`INSERT INTO articulos (id_item, descripcion, cat, disponibilidad, precio) VALUES (?,?,?,?,?)`,
        {replacements: newProd, type: sequelize.QueryTypes.INSERT});
        return 'Nuevo producto agregado'
    } catch (error) {
        console.log('El error fue: ')
        console.log(error)
        throw new Error ('Ocurrió un error en el post.')
    }
}

module.exports.listaProductos = async () => {
    try {
        let resultado = await sequelize.query('SELECT * FROM articulos')
        return resultado[0]
    } catch (error) {
        console.log(error)
        throw new Error ('Ocurrio error en la consulta.')
    }
}

module.exports.agregarArticulo = async (articulo) => {
    let newProd = [
        articulo.id,
        articulo.cantidad
    ]
    try {
        let resultado =await sequelize.query(`UPDATE articulos SET disponibilidad = disponibilidad + ${articulo.cantidad} WHERE id_item = '${articulo.id}'`)
    } catch (error) {
        console.log(error)
        throw new Error('No fue posible actualizar la cantidad.')        
    }
}

module.exports.actualizarPrecio= async (articulo) => {
    let newProd = [
        articulo.id,
        articulo.precio
    ]
    try {
        let resultado =await sequelize.query(`UPDATE articulos SET precio = ${articulo.precio} WHERE id_item = '${articulo.id}'`)
    } catch (error) {
        console.log(error)
        throw new Error('No fue posible actualizar el precio.')        
    }
}

module.exports.restarArticulo = async (articulo) => {
    let newProd = [
        articulo.id,
        articulo.cantidad
    ]
    try {
        let resultado =await sequelize.query(`UPDATE articulos SET disponibilidad = disponibilidad - ${articulo.cantidad} WHERE id_item = '${articulo.id}'`)
    } catch (error) {
        console.log(error)
        throw new Error('No fue posible actualizar la cantidad.')
    }
}
