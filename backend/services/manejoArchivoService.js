const fs = require("fs");

const readObjeto = (nombreArchivo) => {
  try {
    const objeto = fs.readFileSync(nombreArchivo, "utf8");
    //return JSON.parse(objeto);
    return JSON.parse(objeto) || [];
  } catch (error) {
    return [];
  }
};

const saveObjeto = (nombreArchivo, objeto) => {
  const objetoString = JSON.stringify(objeto, null, 2);
  fs.writeFileSync(nombreArchivo, objetoString, "utf-8");
};

module.exports = { readObjeto, saveObjeto };
