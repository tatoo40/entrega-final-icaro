const fs = require("fs");
const ofertaService = require("../services/ofertaService");

const obtengoOfertas = (req, res) => {

  const ofertas = ofertaService.obtengoOfertas()
  .then(oferta => res.status(200).send(oferta))
  .catch(error => res.status(400).send(error))

  
};

const obtengoOfertaId = (req, res) => {
  const { id } = req.params;
  const oferta = ofertaService.obtengoOfertaId(id)
  .then(oferta => res.status(200).send(oferta))
  .catch(error => res.status(400).send(error))
};

const agregarOferta = (req, res) => {
  
  const { body } = req;
  const oferta = ofertaService.agregarOferta(body)
  .then(oferta => res.status(200).send(oferta))
  .catch(error => res.status(400).send(error))
};

const actualizarOferta = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const oferta = ofertaService.actualizarOferta(id, body)  
  .then(ofertas = ofertaService.obtengoOfertas()
  .then(oferta => res.status(200).send(oferta))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};

const eliminarOferta = (req, res) => {
  const { id } = req.params;
  const oferta = ofertaService.eliminarOferta(id)
  .then(oferta => res.status(200).send(oferta))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  agregarOferta,
  obtengoOfertas,
  eliminarOferta,
  obtengoOfertaId,
  actualizarOferta,
};
