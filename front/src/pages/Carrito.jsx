import React, { useEffect, useState, useContext } from "react";
import { Card, List, Avatar, Typography, Input, Button, Modal } from 'antd';
import { CarritoContext } from "../components/CarritoContext";
import { Link } from 'react-router-dom'; // Importa Link
import './CarritoPage.css'; // Estilo opcional
import { DeleteOutlined ,ExclamationCircleOutlined} from "@ant-design/icons"; // Importa el icono

const { Text } = Typography;
const { confirm } = Modal;

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [totalOrden, setTotalOrden] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { cartItems, removeItemFromCart,getCartItems} = useContext(CarritoContext); 

 

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

      const productoEnLocalStorage = cartItems.find((producto) => producto.id === productoId);
    

      if (productoEnLocalStorage && nuevaCantidad > productoEnLocalStorage.stock_actual) {

          confirm({
            title: "Confirmar",
            icon: <ExclamationCircleOutlined />,
            content: (
              <>
                La cantidad ingresada es mayor que el stock disponible (
                {productoEnLocalStorage.stock_actual}). ¿Desea continuar con el stock disponible?
              </>
            ),
            onOk() {
              // User clicked OK, set the quantity to the available stock
              const nuevoCarrito = carrito.map((p) =>
                p.id === productoId ? { ...p, cantidad: productoEnLocalStorage.stock_actual } : p
              );
              setCarrito(nuevoCarrito);
              localStorage.setItem("cart", JSON.stringify(nuevoCarrito));
            },
            onCancel() {
              // User clicked OK, set the quantity to the available stock
              const nuevoCarrito = carrito.map((p) =>
                p.id === productoId ? { ...p, cantidad: productoEnLocalStorage.stock_actual } : p
              );
              setCarrito(nuevoCarrito);
              localStorage.setItem("cart", JSON.stringify(nuevoCarrito));
            },   
          });
        

        }




        return { ...producto, cantidad: nuevaCantidad };
     
     
     
     
      }
      return producto;
    });

    // Actualizar el carrito en el estado y en el localStorage
    setCarrito(nuevoCarrito);
    localStorage.setItem('cart', JSON.stringify(nuevoCarrito));
  };

  const handleEliminarProducto = async (productoId) => {
    // Eliminar el producto del carrito
    const nuevoCarrito = await removeItemFromCart(productoId) 
    setCarrito(nuevoCarrito);

  };


  useEffect(()  => {
    // Obtener los productos del carrito desde el localStorage
    //console.log(cartItems)
    const carritoEnLocalStorage =     JSON.parse(localStorage.getItem("cart"));
    setCarrito(carritoEnLocalStorage);
  }, []);

  return (
    <>
   

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
                />
                <List.Item.Meta  
                title={<a href="#">{producto.nombre}</a>}
/>
                <List.Item.Meta
                description={`Precio Unitario: $${producto.precio}`}
              />
              <Input className="inputCarrito"
                type="number"
                min="1"
                value={producto.cantidad}
                onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
              />
                              <Button
                  type="danger"
                  icon={<DeleteOutlined />} // Agrega el icono de cruz
                  onClick={() => handleEliminarProducto(producto.id)} // Maneja la eliminación
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








    <Modal
        
        title="Mensaje"
        visible={!!errorMessage}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        footer={[
          <Button key="ok" type="primary" onClick={() => setErrorMessage("")}>
            OK
          </Button>
              
        ]}
      >
        {errorMessage}
      </Modal>
    </>
    
  );
};

export default Carrito;
