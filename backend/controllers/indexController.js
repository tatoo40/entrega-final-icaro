const fs = require("fs");
const bcrypt = require("bcrypt");
const { saveUsuarios, readUsuarios,obtenerUsuario,loginBD } = require("../services/usuariosService");

const renderIndex = (req, res) => {
  res.render("index");
  //console.log('Hola hola hola como estas? yo muy bien y tu tambien')
  //res.send('dsadasd')
};



const registrarNuevo = (req, res) => {


  const { nombre, email, password,domicilio,telefono } = req.body;




  obtenerUsuario(email)
  .then(usuario => {
    if (usuario) {
      console.log('Usuario encontrado:');
      console.log(`ID: ${usuario.id}`);
      console.log(`Nombre: ${usuario.nombre}`);
      console.log(`Email: ${usuario.email}`);
      return res.status(400).send("El usuario ya existe");
    } else {
          const saltRounds = 10; // $2b$10$UEhs00CicTlcIc3K3Zjf4uKqyvw4F/iSrbzfFntfIk/W5qDGPu.2O
          // Aplicar el hashing de la contraseña utilizando bcrypt
          bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
            if (error) {
              console.error(error);
              res.status(500).send("Error al hashear la contraseña");
              return;
            }
            // Crear un objeto con el email y la contraseña hasheada
            const nuevoUsuario = {
              nombre,
              email,
              password: hashedPassword, 
              role:'user',
              domicilio,
              telefono// Guardar la contraseña hasheada en lugar de la original
            };


            saveUsuarios(nuevoUsuario);

            return res.status(200).json(nuevoUsuario);
            //console.log(nuevoUsuario)
            //req.session.usuario = nuevoUsuario;

            //res.redirect("/admin/perfil");

          });
    }
  })
  .catch(error => {
    // Maneja errores, como enviar una respuesta de error HTTP
    console.error(error);
  });


  //validar si existe retrun

  // Generar un salt (valor aleatorio) para fortalecer el hashing
  // const saltRounds = 1; // $2b$04$qXQ9W1gqwBTXfvGuZsxG9edctiC1i17pp/U49BgF69jyyyEqvociS

};

const login = (req, res) => {

 
 
  const email = req.body.email;
  const password = req.body.password;
  
  



  loginBD(email,password)
  .then(usuario => {


        //console.log(usuario)

        // si lo encuento uso el bcript compare
        if (usuario!==null) {
        
          //console.log(resultado)
          //console.log(usuario);
          bcrypt.compare(password, usuario.password, (error, result) => {
            if (error) {
              //console.log(error);
              return res.status(400).send("Error al comparar la contraseña");
            }

            // result solo va a ser TRUE o FALSE
            if (result) {
              console.log("Contraseña correcta");
              //req.session.usuario = usuario.dataValues;
              // Enviar el objeto de usuario como respuesta
              return res.status(200).json(usuario.dataValues);
              
            } else {
              console.log("contraseña incorrecta");
              return res.status(500).send("Contraseña incorrecta");
            }
          });
        } else {
          console.log("No existe el usuario");
          return res.status(200).send("No existe el usuario");
        }


  })
  .catch(error => {
    // Maneja errores, como enviar una respuesta de error HTTP
    console.error(error);
  });






};

module.exports = {
  renderIndex,
  registrarNuevo,
  login

};