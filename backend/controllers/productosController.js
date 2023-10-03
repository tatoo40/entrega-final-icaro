const fs = require("fs");
const productosService = require("../services/productosService");

const obtengoProductos = (req, res) => {

  const productos = productosService.obtenerProductos()
  .then(producto => res.status(200).send(producto))
  .catch(error => res.status(400).send(error))

  
};

const obtengoProductoId = (req, res) => {
  const { id } = req.params;
  const producto = productosService.obtenerProductoId(id)
  .then(producto => res.status(200).send(producto))
  .catch(error => res.status(400).send(error))
};

const agregarProducto = (req, res) => {
  const { body } = req;
  const producto = productosService.agregarProducto(body)
  .then(producto => res.status(200).send(producto))
  .catch(error => res.status(400).send(error))
};

const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const producto = productosService.actualizarProducto(id, body)  
  .then(productos = productosService.obtenerProductos()
  .then(producto => res.status(200).send(producto))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};

const eliminarProducto = (req, res) => {
  const { id } = req.params;
  const producto = productosService.eliminarProducto(id)
  .then(producto => res.status(200).send(producto))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  agregarProducto,
  obtengoProductos,
  eliminarProducto,
  obtengoProductoId,
  actualizarProducto,
};
