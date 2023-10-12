import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import MainLayout from "./layouts/MainLayout";
import CheckoutForm from "./pages/Checkout";
import AgregarProductsForm from "./pages/AgregarProducto";
import Productos from "./pages/productos";
import ActualizarProductoForm from "./pages/ActualizarProducto";
import Carrito from "./pages/carrito";
import OrdenSuccess from "./pages/OrdenSuccess";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";


const App = () => {
  //const { isLogged, user } = useUserLogin();



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout ><Home /></MainLayout>}/>
          <Route path="/login" element={<MainLayout ><Login /></MainLayout>}/>
          <Route path="/logout" element={<MainLayout ><Logout /></MainLayout>}/>
          <Route path="/carrito" element={<MainLayout ><Carrito /></MainLayout>}/>     
          <Route path="/checkout" element={<MainLayout ><CheckoutForm /></MainLayout>}/>     
          <Route path="/orden-success" element={<MainLayout ><OrdenSuccess /></MainLayout>}/>  
          <Route path="/perfil" element={<MainLayout ><Perfil /></MainLayout>}/>  
          <Route path="/registro" element={<MainLayout ><Registro /></MainLayout>} />
          <Route path="/agregarproducto" element={<MainLayout ><AgregarProductsForm /></MainLayout>} />
          <Route path="/actualizaproducto/:id" element={<MainLayout ><ActualizarProductoForm /></MainLayout>} />
          <Route path="/productos" element={<MainLayout ><Productos /></MainLayout>} />

   
          <Route
            path="*"
           element={<NotFound />}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
