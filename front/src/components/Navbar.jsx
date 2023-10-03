import React from "react";
import { useState,useEffect } from "react";
import { Layout, Menu } from 'antd';
import useUserLogin from "../store/useUserLogin";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  ShoppingCartOutlined, // Agrega el icono del carrito
} from '@ant-design/icons';
import useUserLogout from "../store/useUserLogout";


const { Header } = Layout;
//const [cartItemCount, setCartItemCount] = useState(0);

const Navbar = () => {


  const navigate = useNavigate();

  const [cartItemCount, setCartItemCount] = useState(JSON.parse(localStorage.getItem("cart"))?.length || 0);


  ///console.log(JSON.parse(localStorage.getItem("cart"))?.length || 0)
  //const cartItemCount = ;

  //const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación


  const { isLogged, user } = useUserLogin();

  console.log(user)
  console.log( isLogged) 


  //const { isLoggedOut, logout } = useUserLogout();




  
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
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Realiza el cierre de sesión y actualiza el estado isLoggedIn a false
    useUserLogout()


  };

  //setCartItemCount( JSON.parse(sessionStorage.getItem("cart"))?.length || 0)
 
  
  return (
    
    
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Productos
        </Menu.Item>
        {isLogged ? ( // Verifica si el usuario está autenticado
          <Menu.Item key="2" icon={<UserOutlined />} onClick={handlePerfil}>
            <Link to="/perfil">Bienvenido {user.nombre}</Link>
          </Menu.Item>
        ) : (
          // Si no está autenticado, muestra la opción de inicio de sesión
          <Menu.Item key="2" onClick={handleLogin}>
            Iniciar Sesión
          </Menu.Item>
        )}

        {/* Agrega el icono del carrito y la cantidad de elementos */}
        <Menu.Item key="4" icon={<ShoppingCartOutlined />} onClick={handleCart}>
          Carrito ({cartItemCount})
        </Menu.Item>
        {isLogged && ( // Muestra la opción de cerrar sesión si está autenticado
          <Menu.Item key="5" onClick={handleLogout}>
            Cerrar Sesión
          </Menu.Item>
        )}
      </Menu>
    </Header>
    {/* Resto de tu aplicación */}
  </Layout>
  );
};

export default Navbar;
