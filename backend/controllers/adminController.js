const renderPerfil = (req, res) => {

   console.log(req.session.usuario);

  const usuario = req.session.usuario;
  
  email ='sdsada'
  nombre = 'dasdasdas'
  // Verifica si los datos del usuario están presentes
  if (email) {
    //const email = usuario.email;
    //console.log(email); // Muestra el email del usuario en la consola

    // Renderiza la vista "perfil" con el email del usuario
    
    res.render('perfil', { email ,nombre});

  };
  
  
}

module.exports = {
  renderPerfil,
}