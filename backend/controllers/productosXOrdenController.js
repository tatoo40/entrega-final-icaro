const fs = require("fs");
const productosXOrdenService = require("../services/productosXOrdenService");

const obtengoProdcutosXOrdenes= (req, res) => {

  const productosXOrdenes = productosXOrdenService.obtengoProdcutosXOrdenes()
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))

  
};

const obtengoProductosXOrdenId = (req, res) => {
  const { id } = req.params;
  const orden = productosXOrdenService.obtengoProductosXOrdenId(id)
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))
};

const agregarProductosXOrden = (req, res) => {
  const { body } = req;
  const orden = productosXOrdenService.agregarProductosXOrden(body)
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))
};

const actualizarProductoXOrden = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const orden = productosXOrdenService.actualizarProductoXOrden(id, body)  
  .then(ordenes = productosXOrdenService.obtenerProductosXOrdenes()
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};

const eliminarProductoXOrden = (req, res) => {
  const { id } = req.params;
  const orden = productosXOrdenService.eliminarProductoXOrden(id)
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  obtengoProdcutosXOrdenes,
  obtengoProductosXOrdenId,
  agregarProductosXOrden,
  eliminarProductoXOrden,
  actualizarProductoXOrden,
};
