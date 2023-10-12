const express = require("express");
const router = express.Router(); 
const  favoritosController = require("../controllers/favoritoController")

router.get("/", favoritosController.obtengoFavoritos);
router.get("/usu/:id", favoritosController.obtengoFavoritoIdUsuario); 
router.get("/:id", favoritosController.obtengoFavoritoId); 
router.post("/", favoritosController.agregarFavorito);
router.delete("/:id", favoritosController.eliminarFavorito);
router.put("/:id", favoritosController.actualizarFavorito)


module.exports = router