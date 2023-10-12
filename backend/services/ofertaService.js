const fs = require("fs");

const Oferta  = require('../models').oferta;

// Función para leer los datos del archivo productos.json
async function  obtengoOfertas() {
  const ofertas =  await obtengoOfertasBD();
  console.log(ofertas)
  //const usuariosParsed = JSON.parse(usuarios);
  return ofertas;
};

async function actualizarOferta (id, body) {
  
  
    const ofertas =  await actaulizarOfertaByIdBD(id,body);
    console.log(ofertas)
    //const usuariosParsed = JSON.parse(usuarios);
    return ofertas;


};

async function  obtenerOfertaId (id) {
  const ofertas =  await obtenerOfertaByIdBD(id);
  console.log(ofertas)
  //const usuariosParsed = JSON.parse(usuarios);
  return ofertas;
};

async function eliminarOferta (id)  {


  const ofertaEliminado =  await eliminarOfertaById(id);

  const ofertas =  await obtengoOfertasBD();
  console.log(ofertas)
  //const usuariosParsed = JSON.parse(usuarios);
  return ofertas;
};

async function agregarOferta(oferta){
  const ofertas =  await agregarOfertaBD(oferta);
  console.log(ofertas)
  //const usuariosParsed = JSON.parse(usuarios);
  return ofertas;
};


async function agregarOfertaBD(oferta) {
  try {
    const ofertas = await Oferta.create({ 
      fecha: oferta.fecha, 
      idUsuario: oferta.idUsuario,
      cantidad_productos: oferta.cantidad_productos,
      precio_total: oferta.precio_total, 
      comentarios: oferta.comentarios, 
    });
    return ofertas;
  } catch (error) {
    throw error;
  }
}

async function obtengoOfertasBD() {
  try {
    const ofertas = await Oferta.findAll();
    return ofertas;
  } catch (error) {
    throw error;
  }
}


async function obtenerOfertaByIdBD(id) {
  try {
    const ofertas = await Oferta.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return ofertas;
  } catch (error) {
    throw error;
  }
}


async function actaulizarOfertaByIdBD(id,body) {
  try {
    const ofertas =  await Oferta.update({ 
      nombre: body.nombre,
  
    
    }, {
        where: {
          id: id
        }
      }); 
    //Book.findById(id
    return ofertas;
  } catch (error) {
    throw error;
  }
}

async function eliminarOfertaById(id) {
  try {
    const oferta = await Oferta.destroy({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return oferta;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtengoOfertas,
  obtenerOfertaId,
  agregarOferta,
  eliminarOferta,
  actualizarOferta,
};
