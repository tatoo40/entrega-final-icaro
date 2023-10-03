const express = require("express");
const router = express.Router(); 
const  usuariosController = require("../controllers/usuarioController")


router.get("/", usuariosController.obtengoUsuarios);
router.get("/:id", usuariosController.obtengoUsuarioId); 
router.post("/", usuariosController.agregarUsuario);
router.delete("/:id", usuariosController.eliminarUsuario);
router.put("/:id", usuariosController.actualizarUsuario)


module.exports = router