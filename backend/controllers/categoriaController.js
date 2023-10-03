const fs = require("fs");
const categoriaService = require("../services/categoriaService");

const obtengoCategorias = (req, res) => {

  const categorias = categoriaService.obtengoCategorias()
  .then(categoria => res.status(200).send(categoria))
  .catch(error => res.status(400).send(error))

  
};

const obtengoCategoriaId = (req, res) => {
  const { id } = req.params;
  const categoria = categoriaService.obtengoCategoriaId(id)
  .then(categoria => res.status(200).send(categoria))
  .catch(error => res.status(400).send(error))
};

const agregarCategoria = (req, res) => {
  const { body } = req;
  const categoria = categoriaService.agregarCategoria(body)
  .then(categoria => res.status(200).send(categoria))
  .catch(error => res.status(400).send(error))
};

const actualizarCategoria = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const categoria = categoriaService.actualizarCategoria(id, body)  
  .then(categorias = categoriaService.obtenerCategorias()
  .then(categoria => res.status(200).send(categoria))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};

const eliminarCategoria = (req, res) => {
  const { id } = req.params;
  const categoria = categoriaService.eliminarCategoria(id)
  .then(categoria => res.status(200).send(categoria))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  agregarCategoria,
  obtengoCategorias,
  eliminarCategoria,
  obtengoCategoriaId,
  actualizarCategoria,
};
