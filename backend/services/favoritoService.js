const Favorito       = require('../models').favorito;

// Función para leer los datos del archivo productos.json
async function  obtengoFavoritos() {
  const favoritos =  await obtengoFavoritosBD();

  return favoritos;
};

async function actualizarFavorito (id, body) {
  
  
    const favoritos =  await actaulizarFavoritoByIdBD(id,body);

    //const usuariosParsed = JSON.parse(usuarios);
    return favoritos;


};

async function  obtenerFavoritoId (id) {
  const favoritos =  await obtenerFavoritoByIdBD(id);
  
  //const usuariosParsed = JSON.parse(usuarios);
  return favoritos;
};

async function  obtengoFavoritoIdUsuario (id) {
  const favoritos =  await obtenerFavoritoByIdUsuarioBD(id);

  //const usuariosParsed = JSON.parse(usuarios);
  return favoritos;
};
async function eliminarFavorito (id)  {


  const favoritoEliminado =  await eliminarFavoritoById(id);

  //const favoritos =  await obtenerFavoritoByIdBD();
  //console.log(favoritoEliminado)
  //const usuariosParsed = JSON.parse(usuarios);
  return favoritoEliminado;
};

async function agregarFavorito(favorito){
  const favoritos =  await agregarFavoritoBD(favorito);
  //console.log(favoritos)
  //const usuariosParsed = JSON.parse(usuarios);
  return favoritos;
};


async function agregarFavoritoBD(favorito) {
  try {
    const favoritos = await Favorito.create({ 
      idProducto: favorito.idProducto, 
      idUsuario: favorito.idUsuario,

    });
    return favoritos;
  } catch (error) {
    throw error;
  }
}

async function obtengoFavoritosBD() {
  try {
    const favoritos = await Favorito.findAll();
    return favoritos;
  } catch (error) {
    throw error;
  }
}


async function obtenerFavoritoByIdBD(id) {
  try {
    const favoritos = await Favorito.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return favoritos;
  } catch (error) {
    throw error;
  }
}


async function obtenerFavoritoByIdUsuarioBD(id) {
  try {
    const favoritos = await Favorito.findAll({
      where: {
        idUsuario: id
      }
    });
    //Book.findById(id
    return favoritos;
  } catch (error) {
    throw error;
  }
}

async function actaulizarFavoritoByIdBD(id,body) {
  try {
    const favoritos =  await Favorito.update({ 
      nombre: body.nombre,
  
    
    }, {
        where: {
          id: id
        }
      }); 
    //Book.findById(id
    return favoritos;
  } catch (error) {
    throw error;
  }
}

async function eliminarFavoritoById(id) {
  try {
    const favorito = await Favorito.destroy({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return favorito;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtengoFavoritos,
  obtenerFavoritoId,
  agregarFavorito,
  eliminarFavorito,
  actualizarFavorito,
  obtengoFavoritoIdUsuario
};
