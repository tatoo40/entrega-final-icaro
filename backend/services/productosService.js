const comentario = require("../models/comentario");
const Producto       = require('../models').producto;
const Comentario       = require('../models').comentario;
// Función para leer los datos del archivo productos.json
async function  obtenerProductos() {
  const productos =  await obtenerProductosBD();

  return productos;
};

async function actualizarProducto (id, body) {
  
  
    const productos =  await actaulizarProductoByIdBD(id,body);

    //const usuariosParsed = JSON.parse(usuarios);
    return productos;


};

async function  obtenerProductoId (id) {
  const productos =  await obtenerProductosByIdBD(id);


  return productos;
};



async function  obtengoNotasProductoId (id) {
  const productos =  await obtenerNotasProductoByIdBD(id);

  return productos;
};




async function eliminarProducto (id)  {


  const productoEliminado =  await eliminarProductoById(id);

  const productos =  await obtenerProductosBD();

  //const usuariosParsed = JSON.parse(usuarios);
  return productos;
};

async function agregarProducto(producto){
  const productos =  await agregarProductoBD(producto);

  //const usuariosParsed = JSON.parse(usuarios);
  return productos;
};


async function agregarProductoBD(producto) {
  try {
    const productos = await Producto.create({ nombre: producto.nombre, precio: producto.precio,foto:producto.foto, 
      descripcion: producto.descripcion,categoria_id: producto.categoria_id, stock_actual:producto.stock_actual,
    tiene_descuento:producto.tiene_descuento, precio_descuento:producto.precio_descuento });
    return productos;
  } catch (error) {
    throw error;
  }
}

async function obtenerProductosBD() {
  try {
    const productos = await Producto.findAll();
    return productos;
  } catch (error) {
    throw error;
  }
}
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


async function obtenerProductosByIdBD(id) {
  try {
    const productos = await Producto.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return productos;
  } catch (error) {
    throw error;
  }
}


async function actaulizarProductoByIdBD(id,body) {
  try {
    const productos =  await Producto.update({ 
      nombre: body.nombre,
      descripcion:body.descripcion,
      precio:body.precio,
      categoria_id:body.categoria_id,
      stock_actual:body.stock_actual,
      tiene_descuento:body.tiene_descuento, 
      precio_descuento:body.precio_descuento
    
    }, {
        where: {
          id: id
        }
      }); 
    //Book.findById(id
    return productos;
  } catch (error) {
    throw error;
  }
}

async function eliminarProductoById(id) {
  try {
    const producto = await Producto.destroy({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return producto;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtenerProductos,
  obtenerProductoId,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  obtengoNotasProductoId
};
