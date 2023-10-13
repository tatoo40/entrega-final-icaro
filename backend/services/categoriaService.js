const Categoria       = require('../models').categoria;

// Función para leer los datos del archivo productos.json
async function  obtengoCategorias() {
  const categorias =  await obtenerCategoriasBD();
 
  //const usuariosParsed = JSON.parse(usuarios);
  return categorias;
};

async function actualizarCategoria (id, body) {
  
  
    const categorias =  await actaulizarCategoriaByIdBD(id,body);

    //const usuariosParsed = JSON.parse(usuarios);
    return categorias;


};

async function  obtenerCategoriaId (id) {
  const categorias =  await obtenerCategoriasByIdBD(id);

  //const usuariosParsed = JSON.parse(usuarios);
  return categorias;
};

async function eliminarCategoria (id)  {


  const categoriaEliminado =  await eliminarCategoriaById(id);

  const categorias =  await obtenerCategoriasBD();

  //const usuariosParsed = JSON.parse(usuarios);
  return categorias;
};

async function agregarCategoria(categoria){
  const categorias =  await agregarCategoriaBD(categoria);

  //const usuariosParsed = JSON.parse(usuarios);
  return categorias;
};


async function agregarCategoriaBD(categoria) {
  try {
    const categorias = await Categoria.create({ nombre: producto.nombre, precio: producto.precio,descripcion: producto.descripcion,categoria_id: producto.categoria_id });
    return categorias;
  } catch (error) {
    throw error;
  }
}

async function obtenerCategoriasBD() {
  try {
    const categorias = await Categoria.findAll();
    return categorias;
  } catch (error) {
    throw error;
  }
}


async function obtenerCategoriasByIdBD(id) {
  try {
    const categorias = await Categoria.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return categorias;
  } catch (error) {
    throw error;
  }
}


async function actaulizarCategoriaByIdBD(id,body) {
  try {
    const categorias =  await Categoria.update({ 
      nombre: body.nombre,
  
    
    }, {
        where: {
          id: id
        }
      }); 
    //Book.findById(id
    return categorias;
  } catch (error) {
    throw error;
  }
}

async function eliminarCategoriaById(id) {
  try {
    const categoria = await Categoria.destroy({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return categoria;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtengoCategorias,
  obtenerCategoriaId,
  agregarCategoria,
  eliminarCategoria,
  actualizarCategoria,
};
