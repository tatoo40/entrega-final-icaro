const express = require("express");
const router = express.Router(); 
const  productosController = require("../controllers/productosController")
const {validarProducto} = require("../middlewares/validarProducto");

router.get("/", productosController.obtengoProductos);
router.get("/notas/:id", productosController.obtengoNotasProductoId); 
router.get("/:id", productosController.obtengoProductoId); 
router.post("/", validarProducto, productosController.agregarProducto);
router.delete("/:id", productosController.eliminarProducto);
router.put("/:id", productosController.actualizarProducto)


module.exports = router