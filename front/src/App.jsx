import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import MainLayout from "./layouts/MainLayout";
import useUserLogin from "./store/useUserLogin";
import { useState } from "react";
import CheckoutForm from "./pages/Checkout";
import AgregarProductsForm from "./pages/AgregarProducto";
import Productos from "./pages/productos";
import ActualizarProductoForm from "./pages/ActualizarProducto";
import Carrito from "./pages/carrito";

// 1) definir rutas con react router dom:
// una para el inicio, otra para el login, otra para el carrito
// 2) crear una store global con zustand, al clickear un producto se agrega al carrito
// 3) consumir esta store en la página del carrito

const App = () => {
  const { isLogged, user } = useUserLogin();



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout ><Home /></MainLayout>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/agregarproducto" element={<AgregarProductsForm />} />
          <Route path="/actualizaproducto/:id" element={<ActualizarProductoForm />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />}/>
      
   
          <Route
            path="*"
            element={
              <>
                <h1>Página no encontrada</h1>
                <Link to={"/"}>Ir al inicio.</Link>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
