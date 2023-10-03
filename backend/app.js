const cookieParser = require('cookie-parser');
const session = require ("express-session")
const cors = require('cors');



const sequelize = require ('./config');


const express = require("express");
const app = express();

app.use(cookieParser());
app.use(cors());

//app.use(session({
//  secret: 'mi-secreto', // Cambia esto por una cadena secreta aleatoria
//  resave: false,
//  saveUninitialized: false,
//  cookie:{maxAge:6000}
//}));

//app.set("view engine", "ejs"); //motor de plantillas ejs
//app.use(express.static("public")); //carpeta publica para archivos estaticos (css, js, img, etc)
app.use(express.urlencoded({ extended: true })); //para poder leer los datos de un formulario
//app.use(express.json());





async function iniciarProyecto() {
  try {
    await sequelize.sync(); // Esto crea las tablas si no existen
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

iniciarProyecto();



// rutas principales, a las que se puede acceder sin estar logeado, ej pagina de inicio, pagina de registro, pagina de login
app.use("/api/", require("./routes/indexRoute")); //contiene la vista index, login, registro
// rutas protegidas, solo pueden acceder los que inician sesion, ej pagina de perfil
app.use("/api/admin",require("./routes/adminRoute")); //contiene la vista perfil
// // rutas de api para usuarios, para la lógica CRUD en usuarios. (GET, POST, PUT, DELETE)


app.use("/api/productos",require("./routes/productosRoute"))
app.use("/api/usuarios",require("./routes/usuariosRoute"))
app.use("/api/categorias",require("./routes/categoriasRoute"))
app.use("/api/ordenes",require("./routes/ordenesRoute"))
app.use("/api/productosxorden",require("./routes/productosXOrdenRoute"))

app.listen(4000, () => {
  console.log("Servidor iniciado en el puerto 4000");
});