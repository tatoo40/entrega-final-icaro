
const Usuario       = require('../models').usuario;
const bcrypt = require("bcrypt");


function saveUsuarios(usuario) {
  const result = crearUsuario(usuario)
  return result;
}

async function readUsuarios() {
  //const usuarios = fs.readFileSync("usuarios.json", "utf-8");
  //const usuariosParsed = JSON.parse(usuarios);
  //return usuariosParsed;

  const usuarios = await obtenerUsuarios();
  //console.log(usuarios)
  //const usuariosParsed = JSON.parse(usuarios);
  return usuarios;

}

async function obtenerUsuario(email) {

  const usuario = await obtenerUsuarioModelo(email);

  return usuario

}

async function loginBD(email,password) {

  const usuario = await loginModelo(email,password);

  return usuario

}
async function actualizarUsuario (id, body) {
  
  
  const usuarios =  await actaulizarUsuarioByIdBD(id,body);
  //console.log(usuarios)
  //const usuariosParsed = JSON.parse(usuarios);
  return usuarios;


};


async function  obtengoUsuarios() {
  const usuarios =  await obtenerUsuariosBD();
  //console.log(usuarios)
  //const usuariosParsed = JSON.parse(usuarios);
  return usuarios;
};


async function obtenerUsuariosBD() {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    throw error;
  }
}

async function obtenerUsuarioId(id) {
  try {
    const usuario = await obtenerUsuarioByIdBD(id);
    //console.log('EL USUARIO ES ' + usuario);
    return usuario;
  } catch (error) {
    throw error; // Asegúrate de manejar los errores adecuadamente o lanzarlos para que se puedan manejar en otro lugar
  }
}


async function obtenerUsuarioByIdBD(id) {
  try {
    const usuario = await Usuario.findAll({
      where: {
        id: id
      }
    });
    //Book.findById(id
    return usuario;
  } catch (error) {
    throw error;
  }
}


async function actaulizarUsuarioByIdBD(id,body) {




  const saltRounds = 10; // $2b$10$UEhs00CicTlcIc3K3Zjf4uKqyvw4F/iSrbzfFntfIk/W5qDGPu.2O
  // Aplicar el hashing de la contraseña utilizando bcrypt
  await  bcrypt.hash(body.password, saltRounds, (error, hashedPassword) => {

    if (error) {
     // console.error(error);
      res.status(500).send("Error al hashear la contraseña");
      return;
    }

    try {

      const usuario =   Usuario.update({ 
        nombre: body.nombre,
        email:body.email,
        telefono:body.telefono,
        domicilio:body.domicilio,
        password:hashedPassword
      
      }, {
          where: {
            id: id
          }
        }); 
      //Book.findById(id
      return usuario;

    } catch (error) {
      
      throw error;
    
    }

  });

}


async function crearUsuario(usuario) {
  try {
    const nuevoUsuario = await Usuario.create({
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      domicilio:usuario.domicilio,
      telefono:usuario.telefono,
      role:usuario.role
      // Otras propiedades del usuario si las hay
    });

    // El nuevo usuario se ha creado y guardado en la base de datos
    return nuevoUsuario;

  } catch (error) {

    throw error;
  
  }
}


async function obtenerUsuarios() {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    throw error;
  }
}


async function obtenerUsuarioModelo(email) {

  //console.log('EL SUAURIOARO ES '+usuario)
  //console.log('EL SUAURIOARO ES '+email)
  try {
    const usuario = await Usuario.findAll({
      where: {
        email: email
      }
    });

    return usuario; 

  } catch (error) {

    throw error;

  }
}



async function loginModelo(email,password) {
  try {

   // console.log(email)
    const usuario = await Usuario.findOne({
      where: {
        email: email
      }
    });

    // Si se encuentra un usuario con el correo electrónico proporcionado, se almacena en 'usuario'
    return usuario; // Puede ser 'null' si no se encuentra ningún usuario con ese email
  } catch (error) {

    throw error;

  }
}



module.exports = {
  saveUsuarios,
  readUsuarios,
  obtenerUsuario,
  loginBD,
  actualizarUsuario,
  obtengoUsuarios,
  obtenerUsuarioId
};