const fs = require("fs");
const ordenService = require("../services/ordenService");

const obtengoOrdenes= (req, res) => {

  const ordenes = ordenService.obtenerOrdenes()
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))

  
};

const obtengoOrdenId = (req, res) => {
  const { id } = req.params;
  const orden = ordenService.obtengoOrdenId(id)
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))
};

const agregarOrden = (req, res) => {
  
  const { body } = req;
  const orden = ordenService.agregarOrden(body)
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))
};

const actualizarOrden = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const orden = ordenService.actualizarOrden(id, body)  
  .then(ordenes = ordenService.obtenerOrdenes()
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};

const eliminarOrden = (req, res) => {
  const { id } = req.params;
  const orden = ordenService.eliminarOrden(id)
  .then(orden => res.status(200).send(orden))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  agregarOrden,
  obtengoOrdenes,
  eliminarOrden,
  obtengoOrdenId,
  actualizarOrden,
};
