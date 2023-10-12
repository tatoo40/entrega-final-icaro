const express = require("express");
const router = express.Router(); 
const  notasController = require("../controllers/notasController")


router.get("/:id", notasController.obtengoNotasProductoId); 



module.exports = router