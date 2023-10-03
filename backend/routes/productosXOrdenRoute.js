const express = require("express");
const router = express.Router(); 
const  productosXOrdenController = require("../controllers/productosXOrdenController")


router.get("/", productosXOrdenController.obtengoProdcutosXOrdenes);
router.get("/:id", productosXOrdenController.obtengoProductosXOrdenId); 
router.post("/", productosXOrdenController.agregarProductosXOrden);
router.delete("/:id", productosXOrdenController.eliminarProductoXOrden);
router.put("/:id", productosXOrdenController.actualizarProductoXOrden)


module.exports = router