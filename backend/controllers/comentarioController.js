const fs = require("fs");
const comentarioService = require("../services/comentarioService");

const obtengoComentarios= (req, res) => {

  const comentarios = comentarioService.obtengoComentarios()
  .then(comentario => res.status(200).send(comentario))
  .catch(error => res.status(400).send(error))

  
};

const obtengoComentarioProdId = (req, res) => {
  const { id } = req.params;
  const comentario = comentarioService.obtengoComentarioProdId(id)
  .then(comentario => res.status(200).send(comentario))
  .catch(error => res.status(400).send(error))
};


const obtengoComentarioId = (req, res) => {
  const { id } = req.params;
  const comentario = comentarioService.obtengoComentarioId(id)
  .then(comentario => res.status(200).send(comentario))
  .catch(error => res.status(400).send(error))
};

const agregarComentario = (req, res) => {
  
  const { body } = req;
  const comentario = comentarioService.agregarComentario(body)
  .then(comentario => res.status(200).send(comentario))
  .catch(error => res.status(400).send(error))
};

const actualizarComentario = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const comentario = comentarioService.actualizarComentario(id, body)  
  .then(comentarios = comentarioService.obtenerComentarios()
  .then(comentario => res.status(200).send(comentario))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};

const eliminarComentario = (req, res) => {
  const { id } = req.params;
  const comentario = comentarioService.eliminarComentario(id)
  .then(comentario => res.status(200).send(comentario))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  agregarComentario,
  obtengoComentarios,
  eliminarComentario,
  obtengoComentarioId,
  actualizarComentario,
  obtengoComentarioProdId
};
