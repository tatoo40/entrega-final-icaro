const fs = require("fs");
const ProductoXOrden       = require('../models').productoXOrden;

// Función para leer los datos del archivo productos.json
async function  obtengoProdcutosXOrdenes() {
  const productosXOrden =  await obtenerProductosXOrdenBD();
  console.log(productosXOrden)
  //const usuariosParsed = JSON.parse(usuarios);
  return productos;
};

async function actualizarProductoXOrden (id, body) {
  
  
    const productosXOrden =  await actaulizarProductoXOrdenByIdBD(id,body);
    console.log(productosXOrden)
    //const usuariosParsed = JSON.parse(usuarios);
    return productosXOrden;


};

async function  obtengoProductosXOrdenId (id) {
  const productosXOrden =  await obtenerProductosXOrdenByIdBD(id);
  console.log(productosXOrden)
  //const usuariosParsed = JSON.parse(usuarios);
  return productosXOrden;
};

async function eliminarProductoXOrden (id)  {


  const productoEliminado =  await eliminarProductoById(id);

  const productosXOrden =  await obtenerProductosXOrdenBD();
  console.log(productosXOrden)
  //const usuariosParsed = JSON.parse(usuarios);
  return productosXOrden;
};

async function agregarProductosXOrden(producto){
  const productosXOrden =  await agregarProductoXOrdenBD(producto);
  //console.log(productosXOrden)
  //const usuariosParsed = JSON.parse(usuarios);
  return productosXOrden;
};


async function agregarProductoXOrdenBD(producto) {

    try {
      const productosXOrden = await ProductoXOrden.create({ 
        idOrden: producto.idOrden, 
        cantidad: producto.cantidad,
        precio: producto.precio,
        idProducto: producto.idProducto, 
        comentarios: '', 
      });
    return productosXOrden;
  } catch (error) {
    throw error;
  }
}

async function obtenerProductosXOrdenBD() {
  try {
    const productosXOrden = await ProductoXOrden.findAll();
    return productosXOrden;
  } catch (error) {
    throw error;
  }
}


async function obtenerProductosXOrdenByIdBD(id) {
  try {
    const productosXOrden = await ProductoXOrden.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return productosXOrden;
  } catch (error) {
    throw error;
  }
}


async function actaulizarProductoXOrdenByIdBD(id,body) {
  try {
    const productosXOrden =  await ProductoXOrden.update({ 
      nombre: body.nombre,
      descripcion:body.descripcion,
      precio:body.precio,
      categoria_id:body.categoria_id
    
    }, {
        where: {
          id: id
        }
      }); 
    //Book.findById(id
    return productosXOrden;
  } catch (error) {
    throw error;
  }
}

async function eliminarProductoXOrdenById(id) {
  try {
    const productoXOrden = await ProductoXOrden.destroy({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return productoXOrden;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtengoProdcutosXOrdenes,
  obtengoProductosXOrdenId,
  agregarProductosXOrden,
  eliminarProductoXOrden,
  actualizarProductoXOrden,
};
