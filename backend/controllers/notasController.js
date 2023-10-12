const fs = require("fs");
const notasService = require("../services/notasService");



const obtengoNotasProductoId = (req, res) => {
  const { id } = req.params;
  const producto = notasService.obtengoNotasProductoId(id)
  .then(producto => res.status(200).send(producto))
  .catch(error => res.status(400).send(error))
};



module.exports = {

  obtengoNotasProductoId
};
