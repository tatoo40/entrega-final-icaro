const fs = require("fs");
const usuariosService = require("../services/usuariosService");

const obtengoUsuarios = (req, res) => {

  const usuarios = usuariosService.obtenerUsuarios()
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))

  
};

const obtengoUsuarioId = (req, res) => {
  const { id } = req.params;
  const usuario = usuariosService.obtenerUsuarioId(id)
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))
};

const agregarUsuario = (req, res) => {
  const { body } = req;
  const usuario = usuariosService.agregarUsuario(body)
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))
};

const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const usuario = usuariosService.actualizarUsuario(id, body)  
  .then(usuarios = usuariosService.obtenerUsuarioId(id)
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};

const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const usuario = usuariosService.eliminarUsuario(id)
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  agregarUsuario,
  obtengoUsuarios,
  eliminarUsuario,
  obtengoUsuarioId,
  actualizarUsuario,
};
