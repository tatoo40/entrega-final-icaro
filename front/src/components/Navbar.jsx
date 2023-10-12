import React from "react";
import { useState,useEffect ,useContext} from "react";
import { CarritoContext } from "./CarritoContext";
import { AuthContext } from "./AuthContext";
import { Layout, Menu } from 'antd';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined, // Agrega el icono del carrito
} from '@ant-design/icons';


const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1"); 
  

  const { getCartItemCount } = useContext(CarritoContext); 
  // Usa useEffect para actualizar la clave seleccionada cuando cambia la ubicación (ruta)
  useEffect(() => {
    switch (location.pathname) {
      case "/perfil":
        setSelectedKey("2");
        break;
      case "/carrito":
        setSelectedKey("4");
        break;
        case "/login":
          setSelectedKey("2");
          break;  
          case "/registro":
            setSelectedKey("0");
            break;  
            case "/productos":
              setSelectedKey("6");
              break;  
      default:
        setSelectedKey("1");
        break;

    }
  }, [location.pathname]);

  const navigate = useNavigate();

  const { isLogged, user, handleLogout } = useContext(AuthContext); // Importa handleLogout desde AuthContext


  
  const handlePerfil = () => {

  };

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Realiza la autenticación y actualiza el estado isLoggedIn a true si es exitosa
    navigate("/login")

 
  };
  const handleCart = () => {
    // Realiza la autenticación y actualiza el estado isLoggedIn a true si es exitosa
    navigate("/carrito")

 
  };

  
  return (
    
    
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]} // Establece la clave seleccionada actual
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {isLogged ? (
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/perfil">Bienvenido {user.nombre}</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="2">
          <Link to="/login">Iniciar Sesión</Link>
        </Menu.Item>
      )}
      <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
        <Link to="/carrito">Carrito ({getCartItemCount()|| 0})</Link>
      </Menu.Item>
      {(user && user.role === 'admin') && (
          <Menu.Item key="6" icon={<ShoppingCartOutlined />}>
            <a href="/productos">Productos</a>
          </Menu.Item>
        )}    
      {isLogged && (
        <Menu.Item key="5" onClick={handleLogout}>
          <a href="/">Cerrar Sesión</a>
        </Menu.Item>
      )}

    </Menu>
    </Header>
    {/* Resto de tu aplicación */}
  </Layout>
  );
};

export default Navbar;
