const express = require("express");
const {
  registrarNuevo,
  login,
} = require("../controllers/indexController");
const validateRegister = require("../middlewares/validateRegister");
const router = express.Router();


router.post("/login",validateRegister, login); //logica de registro
router.post("/registro", validateRegister, registrarNuevo); //logica de registro

module.exports = router;