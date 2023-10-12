const express = require("express");
const {
  renderIndex,
  renderLogin,
  renderRegistro,
  registrarNuevo,
  login,
} = require("../controllers/indexController");
const validateRegister = require("../middlewares/validateRegister");
const router = express.Router();


router.get("/", renderIndex); //pagina de inicio
router.post("/login", login); //logica de registro
router.post("/registro", validateRegister, registrarNuevo); //logica de registro

module.exports = router;