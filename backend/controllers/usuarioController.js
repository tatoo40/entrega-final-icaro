const fs = require("fs");
const usuariosService = require("../services/usuariosService");

const obtengoUsuarios = (req, res) => {

  const usuarios = usuariosService.obtenerUsuarios()
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))

  
};

const obtengoUsuarioId = (req, res) => {
  const { id } = req.params;
  const usuario = usuariosService.obtenerUsuarioId(id)
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))
};

const agregarUsuario = (req, res) => {
  const { body } = req;
  const usuario = usuariosService.agregarUsuario(body)
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))
};

const actualizarUsuario = (req, res) => {

  const { id } = req.params;
  const { body } = req;

  //console.log(id);

  usuariosService.obtenerUsuarioId(id)
  .then(usuarioId => {

      if (usuarioId[0].dataValues.email !== body.email){



        usuariosService.obtenerUsuario(body.email)
          .then(usuario => {

            //console.log("sdasdsdasdas dasdas dasdasd asdasd asdasdasdas")
              //console.log(usuario)
            
                if (usuario) {

                    console.log('Usuario encontrado:');
                    console.log(`ID: ${usuario.id}`);
                    console.log(`Nombre: ${usuario.nombre}`);
                    console.log(`Email: ${usuario.email}`);
                    return res.status(400).send("El usuario ya existe");
              
                  } else {


                    usuariosService.actualizarUsuario(id, body)
                    .then(() => {
                      return usuariosService.obtenerUsuarioId(id);
                    })
                    .then((usuario) => {
                      res.status(200).send(usuario);
                    })
                    .catch((error) => {
                      res.status(400).send(error);
                    });
                }
            })

      }else{

                usuariosService.actualizarUsuario(id, body)
                .then(() => {
                  //console.log('EL SUAURIOARO ES '+usuario)
                  return usuariosService.obtenerUsuarioId(id);
                })
                .then((usuario) => {
                  res.status(200).send(usuario);
                })
                .catch((error) => {
                  res.status(400).send(error);
                });
      

          }
    })
};

const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const usuario = usuariosService.eliminarUsuario(id)
  .then(usuario => res.status(200).send(usuario))
  .catch(error => res.status(400).send(error))
};

module.exports = {
  agregarUsuario,
  obtengoUsuarios,
  eliminarUsuario,
  obtengoUsuarioId,
  actualizarUsuario,
};
