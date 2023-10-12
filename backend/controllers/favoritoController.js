const fs = require("fs");
const favoritoService = require("../services/favoritoService");
const favorito = require("../models/favorito");

const obtengoFavoritos= (req, res) => {

  const favoritos = favoritoService.obtengoFavoritos()
  .then(favorito => res.status(200).send(favorito))
  .catch(error => res.status(400).send(error))

  
};

const obtengoFavoritoId = (req, res) => {
  const { id } = req.params;
  const favorito = favoritoService.obtengoFavoritoId(id)
  .then(favorito => res.status(200).send(favorito))
  .catch(error => res.status(400).send(error))
};

const obtengoFavoritoIdUsuario = (req, res) => {
  const { id } = req.params;
  const favorito = favoritoService.obtengoFavoritoIdUsuario(id)
  .then(favorito => res.status(200).send(favorito))
  .catch(error => res.status(400).send(error))
};


const agregarFavorito = (req, res) => {
  
  const { body } = req;
  const favorito = favoritoService.agregarFavorito(body)
  .then(favorito => res.status(200).send(favorito))
  .catch(error => res.status(400).send(error))
};

const actualizarFavorito = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const favorito = favoritoService.actualizarFavorito(id, body)  
  .then(favoritos = favoritoService.obtengoFavoritos()
  .then(favorito => res.status(200).send(favorito))
  .catch(error => res.status(400).send(error)))
  .catch(error => res.status(400).send(error))
};





const eliminarFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    // Suponiendo que `favoritoService.eliminarFavorito(id)` devuelve una promesa
    const favorito = await favoritoService.eliminarFavorito(id);
   // console.log(favorito);
    res.sendStatus(200);
  } catch (error) {
    //console.error(error);
    res.status(400).send(error);
  }
};


module.exports = {
  agregarFavorito,
  obtengoFavoritos,
  eliminarFavorito,
  obtengoFavoritoId,
  actualizarFavorito,
  obtengoFavoritoIdUsuario
};
