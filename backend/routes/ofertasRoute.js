const express = require("express");
const router = express.Router(); 
const  ofertaController = require("../controllers/ofertaController")

router.get("/", ofertaController.obtengoOfertas);
router.get("/:id", ofertaController.obtengoOfertaId); 
router.post("/", ofertaController.agregarOferta);
router.delete("/:id", ofertaController.eliminarOferta);
router.put("/:id", ofertaController.actualizarOferta)


module.exports = router