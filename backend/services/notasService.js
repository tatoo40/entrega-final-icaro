const Comentario       = require('../models').comentario;






async function  obtengoNotasProductoId (id) {
  const productos =  await obtenerNotasProductoByIdBD(id);
  //console.log(productos)
  //const usuariosParsed = JSON.parse(usuarios);
  return productos;
};



async function obtenerNotasProductoByIdBD(id) {
  try {
    const productos = await Comentario.findAll({
      where: {
        idProducto: id
      }
    });
    //Book.findById(id
    return productos;
  } catch (error) {
    throw error;
  }
}



module.exports = {

  obtengoNotasProductoId
};
