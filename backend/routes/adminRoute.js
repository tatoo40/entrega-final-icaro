const express = require("express");
const { renderPerfil } = require("../controllers/adminController");
const router = express.Router();

router.get("/perfil", renderPerfil); //pagina de inicio

module.exports = router;