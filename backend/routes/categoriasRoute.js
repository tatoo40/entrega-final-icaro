const express = require("express");
const router = express.Router(); 
const  categoriasController = require("../controllers/categoriaController")


router.get("/", categoriasController.obtengoCategorias);
router.get("/:id", categoriasController.obtengoCategoriaId); 
router.post("/",  categoriasController.agregarCategoria);
router.delete("/:id", categoriasController.eliminarCategoria);
router.put("/:id", categoriasController.actualizarCategoria)


module.exports = router