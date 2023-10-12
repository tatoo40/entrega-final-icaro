const express = require("express");
const router = express.Router(); 
const  comentarioController = require("../controllers/comentarioController")

router.get("/", comentarioController.obtengoComentarios);
router.get("/:id", comentarioController.obtengoComentarioId); 
router.get("/prod/:id", comentarioController.obtengoComentarioProdId); 
router.post("/", comentarioController.agregarComentario);
router.delete("/:id", comentarioController.eliminarComentario);
router.put("/:id", comentarioController.actualizarComentario)


module.exports = router