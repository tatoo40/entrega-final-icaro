const fs = require("fs");

const Orden       = require('../models').orden;

// Función para leer los datos del archivo productos.json
async function  obtenerOrdenes() {
  const ordenes =  await obtenerOrdenesBD();
  console.log(ordenes)
  //const usuariosParsed = JSON.parse(usuarios);
  return ordenes;
};

async function actualizarOrden (id, body) {
  
  
    const ordenes =  await actaulizarOrdenByIdBD(id,body);
    console.log(ordenes)
    //const usuariosParsed = JSON.parse(usuarios);
    return ordenes;


};

async function  obtenerOrdenId (id) {
  const ordenes =  await obtenerOrdenesByIdBD(id);
  console.log(ordenes)
  //const usuariosParsed = JSON.parse(usuarios);
  return ordenes;
};

async function eliminarOrden (id)  {


  const ordenEliminado =  await eliminarOrdenById(id);

  const ordenes =  await obtenerOrdenesBD();
  console.log(ordenes)
  //const usuariosParsed = JSON.parse(usuarios);
  return ordenes;
};

async function agregarOrden(orden){
  const ordenes =  await agregarOrdenBD(orden);
  console.log(ordenes)
  //const usuariosParsed = JSON.parse(usuarios);
  return ordenes;
};


async function agregarOrdenBD(orden) {
  try {
    const ordenes = await Orden.create({ nombre: producto.nombre, precio: producto.precio,descripcion: producto.descripcion,categoria_id: producto.categoria_id });
    return ordenes;
  } catch (error) {
    throw error;
  }
}

async function obtenerOrdenesBD() {
  try {
    const ordenes = await Orden.findAll();
    return ordenes;
  } catch (error) {
    throw error;
  }
}


async function obtenerOrdenesByIdBD(id) {
  try {
    const ordenes = await Orden.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return ordenes;
  } catch (error) {
    throw error;
  }
}


async function actaulizarOrdenByIdBD(id,body) {
  try {
    const ordenes =  await Orden.update({ 
      nombre: body.nombre,
  
    
    }, {
        where: {
          id: id
        }
      }); 
    //Book.findById(id
    return ordenes;
  } catch (error) {
    throw error;
  }
}

async function eliminarCategoriaById(id) {
  try {
    const orden = await Orden.destroy({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return orden;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtenerOrdenes,
  obtenerOrdenId,
  agregarOrden,
  eliminarOrden,
  actualizarOrden,
};
