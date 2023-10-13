const Comentario       = require('../models').comentario;

// Función para leer los datos del archivo productos.json
async function  obtengoComentarios() {
  const comentarios =  await obtengoComentariosBD();

  //const usuariosParsed = JSON.parse(usuarios);
  return comentarios;
};

async function actualizarComentario (id, body) {
  
  
    const comentarios =  await actaulizarComentarioByIdBD(id,body);

    //const usuariosParsed = JSON.parse(usuarios);
    return comentarios;


};

async function  obtenerComentarioId (id) {
  const comentarios =  await obtenerComentarioByIdBD(id);

  //const usuariosParsed = JSON.parse(usuarios);
  return comentarios;
};

async function  obtengoComentarioProdId (id) {
  const comentarios =  await obtenerComentarioProdByIdBD(id);

  //const usuariosParsed = JSON.parse(usuarios);
  return comentarios;
};



async function eliminarComentario (id)  {


  const comentarioEliminado =  await eliminarComentarioById(id);

  const comentarios =  await obtengoComentariosBD();

  //const usuariosParsed = JSON.parse(usuarios);
  return comentarios;
};

async function agregarComentario(comentario){
  const comentarios =  await agregarComentarioBD(comentario);
 
  //const usuariosParsed = JSON.parse(usuarios);
  return comentarios;
};


async function agregarComentarioBD(comentario) {
  try {
    const comentarios = await Comentario.create({ 
      fecha: comentario.fecha, 
      idUsuario: comentario.idUsuario,
      idProducto: comentario.idProducto,
      comentario: comentario.comentario, 
      nota: comentario.nota, 
    });
    return comentarios;
  } catch (error) {
    throw error;
  }
}

async function obtengoComentariosBD() {
  try {
    const comentarios = await Comentario.findAll();
    return comentarios;
  } catch (error) {
    throw error;
  }
}


async function obtenerComentarioByIdBD(id) {
  try {
    const comentarios = await Comentario.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return comentarios;
  } catch (error) {
    throw error;
  }
}



async function obtenerComentarioProdByIdBD(id) {
  try {
    const comentarios = await Comentario.findAll({
      where: {
        idProducto: id
      }
    });
    //Book.findById(id
    return comentarios;
  } catch (error) {
    throw error;
  }
}


async function actaulizarComentarioByIdBD(id,body) {
  try {
    const comentarios =  await Comentario.update({ 
      nombre: body.nombre,
  
    
    }, {
        where: {
          id: id
        }
      }); 
    //Book.findById(id
    return comentarios;
  } catch (error) {
    throw error;
  }
}

async function eliminarComentarioById(id) {
  try {
    const comentario = await Comentario.destroy({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return comentario;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtengoComentarios,
  obtenerComentarioId,
  agregarComentario,
  eliminarComentario,
  actualizarComentario,
  obtengoComentarioProdId
};
