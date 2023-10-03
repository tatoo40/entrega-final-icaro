const express = require("express");
const router = express.Router(); 
const  ordenesController = require("../controllers/ordenController")

router.get("/", ordenesController.obtengoOrdenes);
router.get("/:id", ordenesController.obtengoOrdenId); 
router.post("/", ordenesController.agregarOrden);
router.delete("/:id", ordenesController.eliminarOrden);
router.put("/:id", ordenesController.actualizarOrden)


module.exports = router