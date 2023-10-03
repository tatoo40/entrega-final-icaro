import React, { useEffect, useState } from "react";
import useCheckLogin from "../hooks/useCheckLogin";
import useUserLogin from "../store/useUserLogin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, List, Avatar, Typography, Input, Button } from 'antd';
import { Link } from 'react-router-dom'; // Importa Link
import './CarritoPage.css'; // Estilo opcional

const { Text } = Typography;


const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [totalOrden, setTotalOrden] = useState(0);

  useEffect(() => {
    // Obtener los productos del carrito desde el localStorage
    const carritoEnLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCarrito(carritoEnLocalStorage);
  }, []);

  useEffect(() => {
    // Calcular el precio total de la orden
    const total = carrito.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
    setTotalOrden(total);
  }, [carrito]);

  const handleCantidadChange = (productoId, nuevaCantidad) => {
    // Actualizar la cantidad del producto en el carrito
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id === productoId) {
        return { ...producto, cantidad: nuevaCantidad };
      }
      return producto;
    });

    // Actualizar el carrito en el estado y en el localStorage
    setCarrito(nuevoCarrito);
    localStorage.setItem('cart', JSON.stringify(nuevoCarrito));
  };

  return (
    <>
        <Navbar

/>

<div className="carrito-container">
      <div style={{ width: '66%', textAlign: 'center' }}>
        <h1>Carrito de Compras</h1>
        <List
          itemLayout="horizontal"
          dataSource={carrito}
          renderItem={(producto) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/src/assets/${producto.foto}`} alt={producto.nombre} />}
                title={<a href="#">{producto.nombre}</a>}
                description={`Precio Unitario: $${producto.precio}`}
              />
              <Input className="inputCarrito"
                type="number"
                min="1"
                value={producto.cantidad}
                onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
              />
            </List.Item>
          )}
        />
        <h2>Total de la Orden: ${totalOrden}</h2>
        
        {/* Agrega el botón "Checkout" */}
        <Link to="/checkout">
          <Button type="primary">Checkout</Button>
        </Link>
      </div>
    </div>







    <Footer /></>
  );
};

export default Carrito;
